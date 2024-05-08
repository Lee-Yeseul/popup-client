import { Toast, useToastStore } from '@/app/store/toastStore'

type ToastProps = Toast

export default function ToastItem({ message, type, id }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast)
  const toastType = {
    success: 'bg-yellow-200 text-black',
    error: 'bg-red-300',
    warning: 'bg-orange-300',
    info: 'bg-blue-300',
  }

  return (
    <div
      className={`animate-fade-in flex w-2/3 items-center justify-between rounded-md px-2.5 py-5 shadow ${toastType[type]} text-white`}
    >
      <div>{message}</div>
      <div>
        <button
          type="button"
          className="mr-2 text-sm"
          onClick={() => removeToast(id)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
