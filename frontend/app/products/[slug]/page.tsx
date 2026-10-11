import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AddToCart } from '@/components/product/AddToCart';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-black">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{product.rating}</span>
            </div>
            <span>·</span>
            <span>{product.reviews} reviews</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <AddToCart product={product} />
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You might also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
