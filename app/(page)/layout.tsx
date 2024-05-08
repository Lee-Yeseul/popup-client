import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import Header from '../component/layout/Header'
import Toast from '../component/common/toast/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className} id="root">
        <div className="flex h-full w-full justify-center bg-pink-200">
          <div className="h-[100vh] w-[550px] bg-white">
            <Header />
            <div className="h-full overflow-y-auto">
              <div className="mt-16">{children}</div>
            </div>
          </div>
        </div>
        <Toast />
      </body>
    </html>
  )
}
