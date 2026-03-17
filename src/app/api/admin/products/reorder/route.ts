import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/lib/types';
import { normalizeProduct } from '@/lib/products';

// 캐싱 비활성화
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');

async function getProducts(): Promise<Product[]> {
  const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
  const raw = JSON.parse(data) as unknown[];
  return raw.map(normalizeProduct);
}

async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

// POST: 제품 순서 변경
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, direction } = body;

    if (!productId || !direction) {
      return NextResponse.json(
        { error: 'productId와 direction이 필요합니다.' },
        { status: 400 }
      );
    }

    const products = await getProducts();

    // order 필드가 없는 제품에 기본값 부여
    products.forEach((p, i) => {
      if (p.order === undefined) {
        p.order = i + 1;
      }
    });

    // order 기준으로 정렬
    products.sort((a, b) => (a.order || 0) - (b.order || 0));

    const currentIndex = products.findIndex(p => p.id === productId);
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // 범위 체크
    if (targetIndex < 0 || targetIndex >= products.length) {
      return NextResponse.json(
        { error: '더 이상 이동할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 순서 교환
    const currentOrder = products[currentIndex].order || currentIndex + 1;
    const targetOrder = products[targetIndex].order || targetIndex + 1;

    products[currentIndex].order = targetOrder;
    products[targetIndex].order = currentOrder;

    await saveProducts(products);

    // 정렬된 결과 반환
    products.sort((a, b) => (a.order || 0) - (b.order || 0));

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json(
      { error: '순서 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PUT: 전체 순서 재설정 (드래그앤드롭용)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: 'orderedIds 배열이 필요합니다.' },
        { status: 400 }
      );
    }

    const products = await getProducts();

    // 새로운 순서 적용
    orderedIds.forEach((id: string, index: number) => {
      const product = products.find(p => p.id === id);
      if (product) {
        product.order = index + 1;
      }
    });

    await saveProducts(products);

    // 정렬된 결과 반환
    products.sort((a, b) => (a.order || 0) - (b.order || 0));

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json(
      { error: '순서 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
}
