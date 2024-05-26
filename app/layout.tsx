import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Favicon from '@/public/favicon.ico'
import Footer from '@/app/src/component/layout/Footer'
import BottomNav from '@/app/src/component/layout/BottomNav'
import Toast from '@/app/src/component/common/toast/Toast'

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
    <html lang="kor">
      <body className={inter.className} id="root">
        <div className="font-pretendard flex h-full w-full justify-center">
          <div className="w-full min-w-[350px] max-w-[550px] shadow-lg">
            <Suspense>{children}</Suspense>
            <Footer />
            <BottomNav />
          </div>
        </div>
        <Toast />
      </body>
    </html>
  )
}
