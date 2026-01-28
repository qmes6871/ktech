export type LocalizedString = Partial<Record<'ko' | 'en' | 'zh', string>>;

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ProductSpec {
  name: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  slug: string;
  sku: string;
  description: LocalizedString;
  descriptionHtml?: LocalizedString;
  shortDescription: LocalizedString;
  categories: Category[];
  images: ProductImage[];
  specifications: ProductSpec[];
  specificationsText?: LocalizedString;
  specificationsHtml?: LocalizedString;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
  };
  features?: string[];
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  productInterest?: string;
  message: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  businessHours: string;
}
