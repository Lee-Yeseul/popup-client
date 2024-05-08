import { create } from 'zustand'
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type Toast = {
  id: number
  message: string
  type: ToastType
}

type ToastList = {
  toastList: Toast[]
}

type ToastAction = {
  addToast: (toast: Toast) => void
  removeToast: (id: number) => void
}
export const useToastStore = create<ToastList & ToastAction>((set) => ({
  toastList: [],
  addToast: (toast: Toast) =>
    set((state) => ({ toastList: [...state.toastList, toast] })),
  removeToast: (id: number) =>
    set((state) => ({
      toastList: state.toastList.filter((toast) => toast.id !== id),
    })),
}))
