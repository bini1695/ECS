import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  getOrder: (id: string) => Order | undefined;
  updateStatus: (id: string, status: Order['status']) => void;
  clear: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (data) => {
        const order: Order = {
          ...data,
          id: `ord_${Date.now()}`,
          orderNumber: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),

      updateStatus: (id, status) =>
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }),

      clear: () => set({ orders: [] }),
    }),
    { name: 'orders-storage' }
  )
);