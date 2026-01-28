import { Product, Category } from './types';
import { normalizeLocalizedField } from './localized';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');
const CATEGORIES_FILE = path.join(process.cwd(), 'src/data/categories.json');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeProduct(raw: any): Product {
  return {
    ...raw,
    name: normalizeLocalizedField(raw.name),
    description: normalizeLocalizedField(raw.description),
    descriptionHtml: normalizeLocalizedField(raw.descriptionHtml),
    shortDescription: normalizeLocalizedField(raw.shortDescription),
    specificationsText: normalizeLocalizedField(raw.specificationsText),
    specificationsHtml: normalizeLocalizedField(raw.specificationsHtml),
  };
}

// 파일에서 동적으로 제품 데이터 읽기
function getProductsData(): Product[] {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  const raw = JSON.parse(data) as unknown[];
  return raw.map(normalizeProduct);
}

function getCategoriesData(): Category[] {
  const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
  return JSON.parse(data) as Category[];
}

export function getAllProducts(): Product[] {
  return getProductsData();
}

export function getFeaturedProducts(): Product[] {
  return getProductsData().filter(product => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProductsData().find(product => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProductsData().filter(product =>
    product.categories.some(cat => cat.slug === categorySlug)
  );
}

export function getAllCategories(): Category[] {
  return getCategoriesData();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategoriesData().find(cat => cat.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return getProductsData().map(product => product.slug);
}
