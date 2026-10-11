'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock } from 'lucide-react';
import { useCartStore, selectTotalPrice } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';
import { useAuthStore } from '@/store/authStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(3, 'Zip is required'),
  country: z.string().min(2, 'Country is required'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const addOrder = useOrdersStore((s) => s.addOrder);
  const user = useAuthStore((s) => s.user);
  const subtotal = useCartStore(selectTotalPrice);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? { name: user.name, email: user.email }
      : { name: '', email: '' },
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    // Save the order
    const order = addOrder({
      items: items.map((i) => ({
        productId: i.productId,
        name: i.product.name,
        image: i.product.images[0],
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal,
      shipping,
      total,
      shippingAddress: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zip: data.zip,
        country: data.country,
      },
    });

    clearCart();
    toast.success('Order placed successfully!');
    router.push(`/order-success?id=${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Button onClick={() => router.push('/products')} className="mt-6">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-500 mb-8 flex items-center gap-1.5">
        <Lock className="w-4 h-4" /> Secure checkout
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-[1fr_400px] gap-10"
      >
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label="Phone"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <Input
                label="Street Address"
                {...register('address')}
                error={errors.address?.message}
              />
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  {...register('city')}
                  error={errors.city?.message}
                />
                <Input
                  label="ZIP Code"
                  {...register('zip')}
                  error={errors.zip?.message}
                />
                <Input
                  label="Country"
                  {...register('country')}
                  error={errors.country?.message}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
              💳 This is a demo checkout. No real payment will be processed.
            </div>
          </section>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-sm">
                  <p className="font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-6"
            isLoading={loading}
          >
            <Lock className="mr-2 w-4 h-4" /> Place Order · {formatPrice(total)}
          </Button>
        </div>
      </form>
    </div>
  );
}