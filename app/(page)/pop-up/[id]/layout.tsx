import { ReactNode } from 'react'
import Header from '@/app/src/component/layout/Header'

export default function PopUpDetailPageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="min-h-[90vh]">{children}</div>
    </>
  )
}
