'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore, selectTotalPrice } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = useCartStore(selectTotalPrice);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 mx-auto text-gray-300" />
        <h1 className="text-3xl font-bold mt-6">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
        <Link href="/products" className="inline-block mt-8">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 p-4 border rounded-xl bg-white">
              <Link href={'/products/' + item.product.slug} className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={item.product.images[0]} alt={item.product.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={'/products/' + item.product.slug} className="font-semibold hover:text-blue-600 line-clamp-1">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{formatPrice(item.product.price)} each</p>
                  </div>
                  <button onClick={() => removeItem(item.productId)} className="p-2 h-fit text-red-500 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 rounded-l-lg">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 rounded-r-lg">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(shipping)}
              </span>
            </div>
            {subtotal < 50 && (
              <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                Add {formatPrice(50 - subtotal)} more for free shipping
              </p>
            )}
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="block mt-6">
            <Button className="w-full" size="lg">
              Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/products" className="block mt-2">
            <Button variant="ghost" className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
