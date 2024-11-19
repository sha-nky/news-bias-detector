import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  login: async (email, password) => {
    // Simulate an asynchronous login operation
    return new Promise((resolve, reject) => {
      if (email && password) {
        set({ isAuthenticated: true });
        resolve();
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  },

  signUp: async (email, password) => {
    // Simulate an asynchronous sign-up operation
    return new Promise((resolve, reject) => {
      if (email && password) {
        // In a real app, send a request to your backend to register the user
        console.log(`Signing up user with email: ${email}`);
        set({ isAuthenticated: true });
        resolve();
      } else {
        reject(new Error('Invalid sign-up data'));
      }
    });
  },

  logout: () => {
    set({ isAuthenticated: false });
  },
}));
