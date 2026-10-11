import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        const items = get().items;
        if (items.find((p) => p.id === product.id)) return;
        set({ items: [...items, product] });
      },

      remove: (productId) =>
        set({ items: get().items.filter((p) => p.id !== productId) }),

      toggle: (product) => {
        const items = get().items;
        const exists = items.find((p) => p.id === product.id);
        if (exists) {
          set({ items: items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      has: (productId) => get().items.some((p) => p.id === productId),

      clear: () => set({ items: [] }),
    }),
    { name: 'wishlist-storage' }
  )
);