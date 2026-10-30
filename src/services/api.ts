import { Category, Product } from '../types.ts';
import { CATEGORIES, PRODUCTS } from '../data/catalog.ts';

export async function fetchCategories(): Promise<Category[]> {
  return Promise.resolve(CATEGORIES);
}

export async function fetchProducts(categoryId?: string, search?: string): Promise<Product[]> {
  let list = [...PRODUCTS];

  if (categoryId && categoryId !== 'all') {
    const c = categoryId.toLowerCase();
    if (c === 'accessories') {
      list = list.filter(p => p.mainCategory === 'interior' || p.mainCategory === 'exterior');
    } else {
      list = list.filter(p => 
        p.categoryId.toLowerCase() === c || 
        p.mainCategory.toLowerCase() === c ||
        p.subCategory.toLowerCase() === c
      );
    }
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      Object.entries(p.specs || {}).some(([k, v]) => 
        k.toLowerCase().includes(q) || v.toLowerCase().includes(q)
      )
    );
  }

  return Promise.resolve(list);
}

export async function fetchProductById(id: string): Promise<Product> {
  const prod = PRODUCTS.find(p => p.id === id || p.slug === id);
  if (!prod) {
    throw new Error('Product not found in catalog');
  }
  return Promise.resolve(prod);
}

export async function submitContactInquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  vehicle?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  // Client-side static handler
  return Promise.resolve({
    success: true,
    message: `Thank you ${payload.name}! Your fitment inquiry has been prepared. You can also chat directly with us on WhatsApp.`
  });
}
