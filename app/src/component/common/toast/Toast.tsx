'use client'
import Portal from '../Potal'
import ToastItem from './ToastItem'
import useToast from './useToast'

export default function Toast() {
  const { toastList } = useToast()

  return (
    <Portal>
      <div className="fixed bottom-0 right-0 z-50 flex w-full justify-center">
        <div className="mb-2.5 mr-5 flex w-[550px] flex-col items-end gap-2">
          {toastList.map((toast) => (
            <ToastItem
              key={toast.id}
              message={toast.message}
              type={toast.type}
              id={toast.id}
            />
          ))}
        </div>
      </div>
    </Portal>
  )
}
