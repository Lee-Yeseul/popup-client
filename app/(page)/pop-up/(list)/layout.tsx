import PopUpListHeader from '@/app/src/component/pop-up/PopUpListHeader'
import { ReactNode, Suspense } from 'react'

export default function PopUpListPageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <PopUpListHeader />
      <Suspense>
        <div className="min-h-[90vh]">{children}</div>
      </Suspense>
    </>
  )
}
