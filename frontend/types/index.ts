export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  stock: number;
  featured: boolean;
  categoryId: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}
