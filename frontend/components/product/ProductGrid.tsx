import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="text-center py-20 col-span-full">
        <PackageOpen className="w-16 h-16 mx-auto text-gray-300" />
        <p className="text-gray-500 mt-4 text-lg">No products found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}