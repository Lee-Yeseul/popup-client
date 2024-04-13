import BottomBox from '@/app/component/common/BottomBox'
import { ReactNode } from 'react'

export default function FriendsDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      {children}
      <BottomBox>
        <button className="flex h-full w-full items-center justify-center bg-yellow-100">
          방문 기록 남기러 가기
        </button>
      </BottomBox>
    </div>
  )
}
