'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category');
  const currentSort = searchParams.get('sort');
  const currentPrice = searchParams.get('maxPrice');

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => router.push(pathname);
  const hasFilters = currentCategory || currentSort || currentPrice;

  return (
    <aside className="space-y-6">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <X className="w-3 h-3" /> Clear all filters
        </button>
      )}

      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateParam('category', null)}
            className={cn(
              'block text-sm w-full text-left py-1.5 hover:text-blue-600 transition',
              !currentCategory && 'font-semibold text-blue-600'
            )}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.id)}
              className={cn(
                'block text-sm w-full text-left py-1.5 hover:text-blue-600 transition',
                currentCategory === cat.id && 'font-semibold text-blue-600'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Max Price</h3>
        <input
          type="range"
          min={50}
          max={500}
          step={10}
          value={currentPrice || 500}
          onChange={(e) => updateParam('maxPrice', e.target.value)}
          className="w-full accent-black"
        />
        <p className="text-sm text-gray-600 mt-1">
          Up to ${currentPrice || 500}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <select
          value={currentSort || ''}
          onChange={(e) => updateParam('sort', e.target.value || null)}
          className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </aside>
  );
}