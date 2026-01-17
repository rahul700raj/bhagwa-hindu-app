import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      
      setUser: (user, token) => set({ user, token }),
      
      updateCoins: (coins) => set((state) => ({
        user: { ...state.user, coins }
      })),
      
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
