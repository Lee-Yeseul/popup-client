import { ReactNode } from 'react'
import Header from '@/app/src/component/layout/Header'
import Script from 'next/script'

export default function PopUpDetailPageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <Header />
      <div className="min-h-[90vh]">{children}</div>
    </>
  )
}
