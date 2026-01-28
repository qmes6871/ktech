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

// GET: 제품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const products = await getProducts();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter((p) =>
        p.categories.some((c) => c.slug === category)
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) => {
          const nameMatch = Object.values(p.name).some(
            (v) => v && v.toLowerCase().includes(searchLower)
          );
          return nameMatch || p.sku.toLowerCase().includes(searchLower);
        }
      );
    }

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: '제품 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 제품 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await getProducts();

    // Generate new ID
    const maxId = products.reduce(
      (max, p) => Math.max(max, parseInt(p.id, 10)),
      0
    );
    const newId = (maxId + 1).toString();

    // Generate slug from name (영문, 숫자만 사용)
    const slug =
      body.slug ||
      `product-${newId}`;

    const newProduct: Product = {
      id: newId,
      name: body.name || {},
      slug: slug,
      sku: `SKU-${newId}`,
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

    products.push(newProduct);
    await saveProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: '제품 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
