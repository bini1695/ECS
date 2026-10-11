'use client';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, discountPercent } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';

export function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const discount = discountPercent(product.price, product.comparePrice);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
        {product.comparePrice && (
          <>
            <span className="text-xl text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
            <Badge variant="sale">Save {discount}%</Badge>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 rounded-l-lg"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 rounded-r-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {product.stock > 0 ? (
            <>
              <span className="text-green-600 font-medium">In Stock</span> ({product.stock} available)
            </>
          ) : (
            <span className="text-red-500 font-medium">Out of Stock</span>
          )}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleAdd}
          disabled={product.stock === 0}
          size="lg"
          className="flex-1"
        >
          <ShoppingCart className="mr-2 w-5 h-5" />
          Add to Cart
        </Button>
        <Button size="lg" variant="outline" className="px-4">
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t">
        <div className="flex flex-col items-center text-center gap-2">
          <Truck className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs font-medium">Free Shipping</p>
            <p className="text-xs text-gray-500">Over $50</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <Shield className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs font-medium">Secure Payment</p>
            <p className="text-xs text-gray-500">SSL Encrypted</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <RotateCcw className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs font-medium">Easy Returns</p>
            <p className="text-xs text-gray-500">30 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}