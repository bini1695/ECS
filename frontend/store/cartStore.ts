import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = [...get().items];
        const existing = items.find((i) => i.productId === product.id);
        if (existing) existing.quantity += quantity;
        else items.push({ id: product.id, productId: product.id, quantity, product });
        set({ items });
      },
      removeItem: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({ items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)) });
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);

export const selectTotalItems = (state: CartState) => state.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (state: CartState) => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
