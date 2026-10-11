import { notFound } from 'next/navigation';
import { getCategoryBySlug, categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const products = getProductsByCategory(category.id);

  return (
    <div>
      <div className="relative h-64 md:h-80 overflow-hidden bg-gray-900">
        <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{category.name}</h1>
          <p className="mt-2 text-lg text-white/80">{products.length} products available</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
