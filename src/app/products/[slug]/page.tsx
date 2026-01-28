import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import fs from 'fs';
import path from 'path';
import type { Product } from '@/lib/types';
import { normalizeProduct } from '@/lib/products';
import { resolveLocalized } from '@/lib/localized';

// 항상 최신 데이터를 가져오도록 동적 렌더링
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');

function getProductBySlug(slug: string): Product | undefined {
  noStore();
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  const raw = JSON.parse(data) as unknown[];
  const products = raw.map(normalizeProduct);
  return products.find(product => product.slug === slug);
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: '제품을 찾을 수 없습니다' };
  }

  const name = resolveLocalized(product.name, 'ko');
  const shortDesc = resolveLocalized(product.shortDescription, 'ko');

  return {
    title: `${name} | KTECH`,
    description: shortDesc,
    openGraph: {
      title: name,
      description: shortDesc,
      images: product.images.map((img) => ({
        url: img.src,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  noStore();
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
