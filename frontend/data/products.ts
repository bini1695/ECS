import { Product } from '@/types';

export const products: Product[] = [
  { id: '1', name: 'Wireless Headphones Pro', slug: 'wireless-headphones-pro', description: 'Premium sound with active noise cancellation, 40-hour battery, and memory foam ear cushions.', price: 299, comparePrice: 399, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'], stock: 50, featured: true, categoryId: '1', rating: 4.8, reviews: 234 },
  { id: '2', name: 'Minimalist Leather Watch', slug: 'minimalist-leather-watch', description: 'Timeless piece with sapphire crystal glass, Japanese quartz movement, and Italian leather strap.', price: 189, comparePrice: 249, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800'], stock: 30, featured: true, categoryId: '2', rating: 4.6, reviews: 128 },
  { id: '3', name: 'Smart Speaker Mini', slug: 'smart-speaker-mini', description: 'Voice-controlled smart speaker with rich 360-degree sound and smart home integration.', price: 129, comparePrice: 179, images: ['https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800'], stock: 45, featured: true, categoryId: '1', rating: 4.5, reviews: 89 },
  { id: '4', name: 'Ceramic Vase Set', slug: 'ceramic-vase-set', description: 'Set of 3 handcrafted ceramic vases with matte finish. Perfect for modern interiors.', price: 79, comparePrice: 99, images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800'], stock: 20, featured: true, categoryId: '3', rating: 4.7, reviews: 56 },
  { id: '5', name: 'Premium Canvas Backpack', slug: 'premium-canvas-backpack', description: 'Water-resistant canvas backpack with leather trims and padded laptop compartment.', price: 149, comparePrice: 199, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'], stock: 60, featured: true, categoryId: '4', rating: 4.9, reviews: 312 },
  { id: '6', name: 'LED Desk Lamp', slug: 'led-desk-lamp', description: 'Adjustable LED lamp with 5 color temperatures and wireless charging base.', price: 89, comparePrice: 119, images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'], stock: 40, featured: false, categoryId: '3', rating: 4.4, reviews: 78 },
  { id: '7', name: 'Classic Aviator Sunglasses', slug: 'classic-aviator-sunglasses', description: 'Timeless aviator sunglasses with polarized UV400 lenses and titanium frame.', price: 119, comparePrice: 159, images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'], stock: 35, featured: true, categoryId: '4', rating: 4.6, reviews: 145 },
  { id: '8', name: 'Bluetooth Earbuds Air', slug: 'bluetooth-earbuds-air', description: 'Compact true wireless earbuds with ANC and 30-hour total battery life.', price: 99, comparePrice: 149, images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800'], stock: 80, featured: false, categoryId: '1', rating: 4.5, reviews: 267 },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categoryId: string) => products.filter((p) => p.categoryId === categoryId);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getRelatedProducts = (product: Product, limit = 4) =>
  products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, limit);
