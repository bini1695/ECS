'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const maxPrice = searchParams.get('maxPrice');

  const filtered = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter((p) => p.categoryId === category);
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
    }
    return result;
  }, [category, sort, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">All Products</h1>
        <p className="text-gray-500 mt-2">{filtered.length} product{filtered.length !== 1 ? 's' : ''} available</p>
      </div>
      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        <ProductFilters />
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
