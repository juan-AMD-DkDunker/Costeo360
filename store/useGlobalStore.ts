import { create } from 'zustand';

interface GlobalState {
  theme: 'light' | 'dark';
  isLoading: boolean;
  toggleTheme: () => void;
  setLoading: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  theme: 'light',
  isLoading: false,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLoading: (value: boolean) => set({ isLoading: value }),
}));