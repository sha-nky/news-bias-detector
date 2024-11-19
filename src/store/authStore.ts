import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    if (email && password) {
      set({ isAuthenticated: true });
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));