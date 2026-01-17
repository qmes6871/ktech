import { Product, Category } from './types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getFeaturedProducts(): Product[] {
  return (productsData as Product[]).filter(product => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find(product => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return (productsData as Product[]).filter(product =>
    product.categories.some(cat => cat.slug === categorySlug)
  );
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find(cat => cat.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return (productsData as Product[]).map(product => product.slug);
}
