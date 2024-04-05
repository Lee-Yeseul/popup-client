import { create } from 'zustand'

interface User {
  accessToken: string
  email: string
  userName: string
}

interface UserAction {
  delete: () => void
  update: (user: Partial<User>) => void
}

export const useUserStore = create<User & UserAction>((set) => ({
  accessToken: '',
  email: '',
  userName: '',
  delete: () => set({ accessToken: '' }),
  update: (data) => set((prev) => ({ ...prev, ...data })),
}))
