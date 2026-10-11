import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-gray-500 mt-4 text-lg">Page not found</p>
      <Link href="/" className="inline-block mt-8">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
