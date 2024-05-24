'use client'
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react'
import { io as ClientIO } from 'socket.io-client'

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})
export const useSocket = () => {
  return useContext(SocketContext)
}
export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<any | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!socket) return

    socket.on('disconnect', async () => {
      setIsConnected(false)
    })
  }, [])

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      `${process.env.NEXT_PUBLIC_SOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}/chat`,
      {
        path: '/socket.io',
      },
    )
    socketInstance.on('connect', async () => {
      setIsConnected(true)
    })
    setSocket(socketInstance)
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
