'use client';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/layout/SearchModal';
import { UserMenu } from '@/components/layout/UserMenu';
import { categories } from '@/data/categories';

export function Navbar() {
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="text-2xl font-bold tracking-tight">
              SHOP<span className="text-blue-600">.</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/products"
                className="text-sm hover:text-blue-600 transition"
              >
                Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="text-sm hover:text-blue-600 transition"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User menu */}
            <UserMenu />

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-2xl font-bold">
                SHOP<span className="text-blue-600">.</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="block py-3 border-b font-medium"
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 border-b font-medium"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}