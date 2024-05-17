import { Toast, useToastStore } from '@/app/src/store/toastStore'

type ToastProps = Toast

export default function ToastItem({ message, type, id }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast)
  const toastType = {
    success: 'bg-yellow-200 text-black',
    error: 'bg-red-400',
    warning: 'bg-orange-300',
    info: 'bg-blue-300',
  }

  return (
    <div
      className={`flex w-2/3 animate-fade-in items-center justify-between rounded-md px-2.5 py-5 shadow ${toastType[type]} text-white`}
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
