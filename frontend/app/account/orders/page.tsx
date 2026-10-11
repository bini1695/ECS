'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Package, ArrowRight, Trash2 } from 'lucide-react';
import { useOrdersStore } from '@/store/ordersStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const orders = useOrdersStore((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="w-16 h-16 mx-auto text-gray-300" />
        <h1 className="text-2xl font-bold mt-4">No orders yet</h1>
        <p className="text-gray-500 mt-2">
          When you place an order, it will appear here.
        </p>
        <Link href="/products" className="inline-block mt-6">
          <Button>
            Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-gray-500 mt-1">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-2xl p-6 bg-white hover:shadow-sm transition"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-sm">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    Placed on{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  statusColors[order.status]
                )}
              >
                {order.status}
              </span>
            </div>

            {/* Items preview */}
            <div className="py-4 flex items-center gap-4">
              <div className="flex -space-x-3">
                {order.items.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white bg-gray-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">
                  {order.items[0].name}
                  {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                </p>
                <p className="text-xs text-gray-500">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="font-bold">{formatPrice(order.total)}</p>
              </div>
            </div>

            {/* Details grid */}
            <div className="pt-4 border-t grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">Shipping to</p>
                <p className="text-gray-700">
                  {order.shippingAddress.name}, {order.shippingAddress.city}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Items</p>
                <p className="text-gray-700">
                  {order.items.map((i) => i.name).join(', ').slice(0, 60)}
                  {order.items.length > 1 && '...'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}