import { ReactNode } from 'react'

interface BottomBoxProps {
  children: ReactNode
}
export default function BottomBox({ children }: BottomBoxProps) {
  return (
    <div className="fixed bottom-0 z-10 h-16 w-[550px] border-t-2 border-solid border-gray-200 bg-white">
      {children}
    </div>
  )
}
