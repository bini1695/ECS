'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  LogIn,
  UserPlus,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const accountItems = [
  { icon: Package, label: 'My Orders', href: '/account/orders' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
  { icon: Settings, label: 'Settings', href: '/account/settings' },
];

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success('Signed out successfully');
    router.push('/');
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        className={`p-2 rounded-lg transition ${
          open ? 'bg-gray-100' : 'hover:bg-gray-100'
        }`}
      >
        {user ? (
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {initials}
          </div>
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border py-2 z-50">
          {/* Header */}
          {user ? (
            <div className="px-4 py-3 border-b">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            </div>
          ) : (
            <div className="px-4 py-3 border-b">
              <p className="font-semibold text-sm">Welcome!</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Sign in to access your account
              </p>
            </div>
          )}

          {/* Auth links — only when logged out */}
          {!user && (
            <div className="py-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
              >
                <LogIn className="w-4 h-4 text-gray-500" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition"
              >
                <UserPlus className="w-4 h-4 text-gray-500" />
                <span>Create Account</span>
              </Link>
            </div>
          )}

          {/* Account links — only when logged in */}
          {user && (
            <>
              <div className="border-t my-2" />
              <div className="py-2">
                <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  My Account
                </p>
                {accountItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition group"
                  >
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Sign out */}
          {user && (
            <>
              <div className="border-t my-2" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}