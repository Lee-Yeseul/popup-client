import BottomNav from '@/app/component/layout/BottomNav'
import { ReactNode } from 'react'

export default function FriendsDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      {children}
      <BottomNav />
    </div>
  )
}
