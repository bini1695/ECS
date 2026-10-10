import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  users: Array<User & { password: string }>; // fake user database
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (
    name: string,
    email: string,
    password: string
  ) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],

      register: (name, email, password) => {
        const users = get().users;
        const existing = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (existing) {
          return { success: false, error: 'An account with this email already exists' };
        }

        const newUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        };

        set({ users: [...users, newUser] });

        // Auto-login after register
        const { password: _, ...safeUser } = newUser;
        set({ user: safeUser });

        return { success: true };
      },

      login: (email, password) => {
        const users = get().users;
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!found) {
          return { success: false, error: 'No account found with this email' };
        }

        if (found.password !== password) {
          return { success: false, error: 'Incorrect password' };
        }

        const { password: _, ...safeUser } = found;
        set({ user: safeUser });
        return { success: true };
      },

      logout: () => set({ user: null }),

      isAuthenticated: () => !!get().user,
    }),
    { name: 'auth-storage' }
  )
);