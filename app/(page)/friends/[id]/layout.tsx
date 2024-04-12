import BottomBox from '@/app/component/common/BottomBox'
import { ReactNode } from 'react'

export default function FriendsDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      {children}
      <BottomBox>
        <div className="flex h-full w-full items-center">
          <button className="h-full w-1/6">❤️</button>
          <button className="h-full w-full bg-yellow-100 text-xl font-bold">
            연락하기
          </button>
        </div>
      </BottomBox>
    </div>
  )
}
