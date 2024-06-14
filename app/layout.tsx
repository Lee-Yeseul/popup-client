import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Favicon from '@/public/favicon.png'
import Footer from '@/app/src/component/layout/Footer'
import BottomNav from '@/app/src/component/layout/BottomNav'
import Toast from '@/app/src/component/common/toast/Toast'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { pretendard } from './src/util/font'

const inter = Inter({ subsets: ['latin'] })

const serviceName = process.env.SERVICE_NAME
const serviceURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}`

export const metadata: Metadata = {
  title: {
    template: `%s | ${serviceName}`,
    default: `${serviceName}`,
  },
  description: process.env.SERVICE_DESCRIPTION,
  metadataBase: new URL(serviceURL),
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION },
  icons: [{ rel: 'icon', url: Favicon.src }],
  openGraph: {
    type: 'website',
    title: {
      template: `%s`,
      default: `${serviceName}`,
    },
    description: `%s`,
    images: `%s`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${pretendard.variable}`} id="root">
        <div className="flex h-full w-full justify-center font-pretendard">
          <div className="w-full min-w-[350px] max-w-[550px] shadow-lg">
            {children}
            <Footer />
            <BottomNav />
            <Script
              type="text/javascript"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
              strategy="beforeInteractive"
            />
          </div>
        </div>
        <Toast />
      </body>
      <Analytics />
      <GoogleAnalytics gaId="G-S1RPEX4P1B" />
    </html>
  )
}
