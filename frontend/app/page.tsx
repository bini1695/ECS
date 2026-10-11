import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Sparkles, TrendingUp } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { getFeaturedProducts } from '@/data/products';
import { categories } from '@/data/categories';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const trending = [...featured].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-blue-400 mb-4 uppercase">
              <Sparkles className="w-4 h-4" />
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Premium products,
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                curated for you.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
              Discover our handpicked selection of high-quality products designed
              for modern living. Free shipping on orders over $50.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/products?sort=rating">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Top Rated
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-gray-400 mt-1">Happy customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-gray-400 mt-1">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-sm text-gray-400 mt-1">Avg rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST BADGES ========== */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-2">Explore our curated collections</p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-xs text-white/80 mt-1 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Shop now <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== FEATURED PRODUCTS ========== */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              Handpicked
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-2">Our favorites from this season</p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* ========== PROMO BANNER ========== */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative px-8 py-16 md:py-20 text-center text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 opacity-90">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Get 20% off your first order
            </h2>
            <p className="mt-4 text-white/90 text-lg max-w-xl mx-auto">
              Use code{' '}
              <span className="font-mono font-bold bg-white/20 px-3 py-1 rounded">
                WELCOME20
              </span>{' '}
              at checkout
            </p>
            <Link href="/products" className="inline-block mt-8">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TRENDING ========== */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-2">
              <TrendingUp className="w-4 h-4" />
              Hot right now
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Trending Products
            </h2>
          </div>
          <Link
            href="/products?sort=rating"
            className="text-sm font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={trending} />
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay in the loop
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-white text-black hover:bg-gray-100 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}