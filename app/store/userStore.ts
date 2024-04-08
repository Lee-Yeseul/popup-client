import { create } from 'zustand'

interface User {
  email: string
  userName: string
}

interface UserAction {
  delete: () => void
  update: (user: Partial<User>) => void
}

export const useUserStore = create<User & UserAction>((set) => ({
  email: '',
  userName: '',
  delete: () => set({ email: '', userName: '' }),
  update: (data) => set((prev) => ({ ...prev, ...data })),
}))
