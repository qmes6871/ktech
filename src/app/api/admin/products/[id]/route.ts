import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/lib/types';
import { normalizeProduct } from '@/lib/products';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');

async function getProducts(): Promise<Product[]> {
  const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
  const raw = JSON.parse(data) as unknown[];
  return raw.map(normalizeProduct);
}

async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

// GET: 제품 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await getProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: '제품을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PUT: 제품 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 기존 slug 유지 (수정 시 URL이 변경되지 않도록)
    const slug = products[index].slug;

    const updatedProduct: Product = {
      ...products[index],
      name: body.name || {},
      slug: slug,
      sku: body.sku || products[index].sku,
      description: body.description || {},
      shortDescription: body.shortDescription || {},
      categories: body.categories || [],
      images: body.images || [],
      specifications: body.specifications || [],
      specificationsText: body.specificationsText || {},
      dimensions: body.dimensions || {},
      features: body.features || [],
      featured: body.featured || false,
    };

    products[index] = updatedProduct;
    await saveProducts(products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: '제품 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 제품 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    products.splice(index, 1);
    await saveProducts(products);

    return NextResponse.json({ success: true, message: '제품이 삭제되었습니다.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: '제품 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
