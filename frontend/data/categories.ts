import { Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800' },
  { id: '2', name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800' },
  { id: '3', name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' },
  { id: '4', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800' },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
