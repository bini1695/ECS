'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2, Package, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useOrdersStore } from '@/store/ordersStore';
import { formatPrice } from '@/lib/utils';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const order = useOrdersStore((s) =>
    orderId ? s.orders.find((o) => o.id === orderId) : s.orders[0]
  );

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mt-6">Order Confirmed!</h1>
        <p className="text-gray-500 mt-3">
          Thank you for your purchase. We&apos;ve sent a confirmation email.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products">
            <Button size="lg">
              Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button size="lg" variant="outline">
              View My Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mt-6">Order Confirmed!</h1>
        <p className="text-gray-500 mt-3">
          Thank you for your purchase. We&apos;ve sent a confirmation email to{' '}
          <span className="font-medium text-gray-900">
            {order.shippingAddress.email}
          </span>
          .
        </p>
      </div>

      {/* Order info */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Package className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500 text-xs">Order Number</p>
              <p className="font-mono font-semibold">{order.orderNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Truck className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500 text-xs">Estimated Delivery</p>
              <p className="font-semibold">3-5 business days</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-gray-500 text-xs">Order Total</p>
            <p className="font-bold text-lg">{formatPrice(order.total)}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <h2 className="font-bold mb-4">Items ({order.items.length})</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <p className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="bg-white border rounded-2xl p-6 mb-8">
        <h2 className="font-bold mb-3">Shipping Address</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {order.shippingAddress.name}
          <br />
          {order.shippingAddress.address}
          <br />
          {order.shippingAddress.city}, {order.shippingAddress.zip}
          <br />
          {order.shippingAddress.country}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/account/orders">
          <Button size="lg" className="w-full sm:w-auto">
            View My Orders <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
        <Link href="/products">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}