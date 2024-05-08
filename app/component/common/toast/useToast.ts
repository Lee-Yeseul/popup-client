import { ToastType, useToastStore } from '@/app/store/toastStore'

export default function useToast() {
  const toastList = useToastStore((state) => state.toastList)
  const addToast = useToastStore((state) => state.addToast)
  const removeToast = useToastStore((state) => state.removeToast)

  const toast = (message: string, type: ToastType) => {
    const id = Date.now()
    addToast({ id, message, type })

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  return { toastList, toast }
}
