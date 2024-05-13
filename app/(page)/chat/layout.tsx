import SocketProvider from '@/app/component/chat/SocketProvider'

import { ReactNode } from 'react'

export default function ChatLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <SocketProvider>{children}</SocketProvider>
}
