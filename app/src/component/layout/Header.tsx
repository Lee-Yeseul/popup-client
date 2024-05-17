'use client'
import ArrowBack from '@/public/assets/icons/arrowBack.svg'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <header className="fixed z-10 h-16 w-[550px] bg-white/80">
      <div className="flex h-full items-center justify-between px-4">
        <button onClick={() => router.back()}>
          <ArrowBack width="32" height="32" fill="black" className="p-1" />
        </button>
      </div>
    </header>
  )
}
