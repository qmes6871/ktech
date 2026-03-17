import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs';
import path from 'path';
import type { Product, Category } from '@/lib/types';
import { normalizeProduct } from '@/lib/products';
import { ProductsPageClient } from '@/components/products/ProductsPageClient';

// Dynamic rendering for fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');
const CATEGORIES_FILE = path.join(process.cwd(), 'src/data/categories.json');

function getAllProducts(): Product[] {
  noStore();
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  const raw = JSON.parse(data) as unknown[];
  return raw.map(normalizeProduct);
}

function getAllCategories(): Category[] {
  noStore();
  const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
  return JSON.parse(data) as Category[];
}

function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter(product =>
    product.categories.some(cat => cat.slug === categorySlug)
  );
}

export const metadata: Metadata = {
  title: 'Products | KTECH',
  description: 'Discover KTECH industrial and construction machinery components. Wiper assembly, wiring harness, air compressor, fuel sensor and more.',
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  noStore();
  const params = await searchParams;
  const categorySlug = params.category;
  const categories = getAllCategories();

  const products = categorySlug
    ? getProductsByCategory(categorySlug)
    : getAllProducts();

  const currentCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug) || null
    : null;

  return (
    <ProductsPageClient
      products={products}
      categories={categories}
      categorySlug={categorySlug}
      currentCategory={currentCategory}
    />
  );
}
