export type MainCategoryType = 'all' | 'accessories' | 'interior' | 'exterior' | 'car-care';

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  mainType?: 'accessories' | 'interior' | 'exterior' | 'car-care';
  subcategories?: {
    id: string;
    name: string;
    count?: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  mainCategory: 'interior' | 'exterior' | 'car-care';
  subCategory: string;
  subCategoryName: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  sku: string;
  image: string;
  badge: string | null;
  shortDesc: string;
  specs: Record<string, string>;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  createdAt: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  vehicle?: string;
  message: string;
}

