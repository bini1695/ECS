'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, discountPercent, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { has, toggle } = useWishlistStore();
  const inWishlist = has(product.id);
  const discount = discountPercent(product.price, product.comparePrice);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(product.name + ' added to cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    toast.success(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist'
    );
  };

  return (
    <Link
      href={'/products/' + product.slug}
      className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <Badge variant="sale" className="absolute top-3 left-3">
            -{discount}%
          </Badge>
        )}
        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full transition-all',
            inWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/90 backdrop-blur hover:bg-white text-gray-700'
          )}
        >
          <Heart
            className={cn('w-4 h-4', inWishlist && 'fill-current')}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-gray-700">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <h3 className="mt-1 font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <Button
          onClick={handleAdd}
          size="sm"
          className="w-full mt-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </div>
    </Link>
  );
}