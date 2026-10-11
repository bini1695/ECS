'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { items, remove } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    remove(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart className="w-16 h-16 mx-auto text-gray-300" />
        <h1 className="text-2xl font-bold mt-4">Your wishlist is empty</h1>
        <p className="text-gray-500 mt-2">
          Save your favorite products to view them later.
        </p>
        <Link href="/products" className="inline-block mt-6">
          <Button>
            Explore Products <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="text-gray-500 mt-1">
            {items.length} item{items.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition"
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative aspect-square block bg-gray-100 overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(product.id);
                  toast.success('Removed from wishlist');
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-red-50 transition"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </Link>
            <div className="p-4">
              <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
              <p className="font-bold mt-1">{formatPrice(product.price)}</p>
              <Button
                onClick={() => handleMoveToCart(product)}
                size="sm"
                className="w-full mt-3"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Move to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}