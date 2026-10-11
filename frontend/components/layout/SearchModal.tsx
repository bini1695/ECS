'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const popularSearches = ['Headphones', 'Watch', 'Backpack', 'Speaker', 'Sunglasses'];

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');

  // Reset query when modal closes
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <Modal open={open} onClose={onClose} className="max-w-2xl">
      <div className="p-6 pt-8">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-gray-200 text-lg focus:outline-none focus:border-black transition-colors"
          />
          {hasQuery && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="mt-6 max-h-96 overflow-y-auto">
          {!hasQuery ? (
            // Popular searches
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                <TrendingUp className="w-4 h-4" />
                Popular searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Quick category links */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Quick links
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'All Products', href: '/products' },
                    { label: 'New Arrivals', href: '/products?sort=newest' },
                    { label: 'Best Deals', href: '/products?sort=price-asc' },
                    { label: 'Top Rated', href: '/products?sort=rating' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 border transition group"
                    >
                      <span className="text-sm font-medium">{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            // No results
            <div className="text-center py-12">
              <p className="text-gray-500">No products found for &quot;{query}&quot;</p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching for something else
              </p>
            </div>
          ) : (
            // Results
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-1">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1 group-hover:text-blue-600 transition">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {product.categoryId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(product.price)}</p>
                      {product.comparePrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatPrice(product.comparePrice)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              {results.length >= 6 && (
                <Link
                  href={`/products?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="block mt-4 text-center text-sm font-medium text-blue-600 hover:underline"
                >
                  See all results for &quot;{query}&quot; →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-gray-400">
          <span>Press ESC to close</span>
          <span>Enter to search</span>
        </div>
      </div>
    </Modal>
  );
}