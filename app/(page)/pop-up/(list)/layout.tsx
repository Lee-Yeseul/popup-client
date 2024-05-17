import { ReactNode } from 'react'
import Header from '@/app/component/layout/Header'

export default function PopUpListPageLayout({
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
