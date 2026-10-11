'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const schema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const password = watch('password', '');
  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    letter: /[a-zA-Z]/.test(password),
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const result = registerUser(data.name, data.email, data.password);
    setLoading(false);

    if (result.success) {
      toast.success('Account created! Welcome aboard 🎉');
      router.push('/');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Left: Image */}
      <div className="hidden md:block relative bg-gray-900 order-2 md:order-1">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
          alt="Shopping"
          fill
          sizes="50vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="text-2xl font-bold leading-tight">
            Join thousands of happy customers.
          </p>
          <p className="mt-3 text-white/70">
            Free shipping · Easy returns · 24/7 support
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 order-1 md:order-2">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            SHOP<span className="text-blue-600">.</span>
          </Link>

          <div className="mt-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="text-gray-500 mt-2">
              Start shopping in under a minute
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 p-1 hover:bg-gray-100 rounded"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Password strength */}
            {password.length > 0 && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full flex items-center justify-center',
                      passwordChecks.length ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  >
                    {passwordChecks.length && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className={passwordChecks.length ? 'text-green-600' : 'text-gray-500'}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full flex items-center justify-center',
                      passwordChecks.number ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  >
                    {passwordChecks.number && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className={passwordChecks.number ? 'text-green-600' : 'text-gray-500'}>
                    Contains a number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full flex items-center justify-center',
                      passwordChecks.letter ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  >
                    {passwordChecks.letter && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className={passwordChecks.letter ? 'text-green-600' : 'text-gray-500'}>
                    Contains a letter
                  </span>
                </div>
              </div>
            )}

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1 rounded" />
              <span className="text-gray-600">
                I agree to the{' '}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button type="submit" size="lg" className="w-full" isLoading={loading}>
              Create Account <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}