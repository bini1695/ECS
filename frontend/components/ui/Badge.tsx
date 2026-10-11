import { cn } from '@/lib/utils';

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'sale' | 'success';
  className?: string;
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    sale: 'bg-red-500 text-white',
    success: 'bg-green-100 text-green-800',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}