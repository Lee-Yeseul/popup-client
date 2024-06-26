import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface User {
  isLogin: boolean
  email: string
  username: string
}

interface UserAction {
  delete: () => void
  update: (user: Partial<User>) => void
}

const defaultUser = {
  isLogin: false,
  email: '',
  username: '',
} as const

export const useUserStore = create(
  persist<User & UserAction>(
    (set) => ({
      ...defaultUser,
      delete: () => set(defaultUser),
      update: (data) => set((prev) => ({ ...prev, ...data })),
    }),
    { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) },
  ),
)
