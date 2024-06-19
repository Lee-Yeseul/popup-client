import PopUpListHeader from '@/app/src/component/pop-up/PopUpListHeader'
import { ReactNode } from 'react'

export default function PopUpListPageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <PopUpListHeader />
      <div className="min-h-[90vh]">{children}</div>
    </>
  )
}
