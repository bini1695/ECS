import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              SHOP<span className="text-blue-600">.</span>
            </h3>
            <p className="text-sm text-gray-600">
              Premium products, curated for modern living.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/products" className="hover:text-black">All Products</Link></li>
              <li><Link href="/products?sort=price-asc" className="hover:text-black">Best Deals</Link></li>
              <li><Link href="/products?featured=true" className="hover:text-black">Featured</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Contact</a></li>
              <li><a href="#" className="hover:text-black">Shipping</a></li>
              <li><a href="#" className="hover:text-black">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Privacy</a></li>
              <li><a href="#" className="hover:text-black">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          © 2026 SHOP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}