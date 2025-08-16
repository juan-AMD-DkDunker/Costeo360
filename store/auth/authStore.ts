import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { AuthState } from './types';


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "auth-storage" } // guarda en AsyncStorage
  )
);