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

/**
 * 제품 목록을 order 기준으로 정렬하고, order 값을 1부터 순차적으로 재부여.
 * 중복·갭·누락 문제를 모두 해결.
 */
function normalizeOrder(products: Product[]): void {
  products.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  products.forEach((p, i) => {
    p.order = i + 1;
  });
}

// POST: 제품 순서 변경
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, direction, category } = body;

    if (!productId || !direction) {
      return NextResponse.json(
        { error: 'productId와 direction이 필요합니다.' },
        { status: 400 }
      );
    }

    const products = await getProducts();

    // order 정규화: 정렬 후 1, 2, 3, ... 순차 부여
    normalizeOrder(products);

    // 카테고리 필터가 있으면 해당 카테고리 내에서만 순서 교환
    const targetProducts = category
      ? products.filter(p => p.categories.some(c => c.slug === category))
      : products;

    const currentIndex = targetProducts.findIndex(p => p.id === productId);
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // 범위 체크
    if (swapIndex < 0 || swapIndex >= targetProducts.length) {
      return NextResponse.json(
        { error: '더 이상 이동할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 순서 교환
    const currentProduct = targetProducts[currentIndex];
    const swapProduct = targetProducts[swapIndex];

    const currentOrder = currentProduct.order!;
    const swapOrder = swapProduct.order!;

    // 전체 products 배열에서 해당 제품을 찾아 order 값 교환
    const currentInAll = products.find(p => p.id === currentProduct.id)!;
    const swapInAll = products.find(p => p.id === swapProduct.id)!;

    currentInAll.order = swapOrder;
    swapInAll.order = currentOrder;

    // 정렬된 상태로 저장 (파일 순서 = order 순서)
    products.sort((a, b) => a.order! - b.order!);
    await saveProducts(products);

    return NextResponse.json({ success: true });
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

    // 정렬된 상태로 저장
    products.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    await saveProducts(products);

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json(
      { error: '순서 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
}
