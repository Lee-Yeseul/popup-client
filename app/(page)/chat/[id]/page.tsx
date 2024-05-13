'use client'
import ChatHeader from '@/app/component/chat/ChatHeader'
import ChatInput from '@/app/component/chat/ChatInput'
import Message from '@/app/component/chat/Message'
import { useSocket } from '@/app/component/chat/SocketProvider'

import { useEffect, useState } from 'react'

const userId = Math.random()
export default function Chat({ params }: { params: { id: string } }) {
  const { socket, isConnected } = useSocket()
  const [messageList, setMessageList] = useState<any[]>([])

  useEffect(() => {
    if (!socket) return

    socket.emit('join-room', { roomId: params.id })

    socket.on('new-message', (data: any) => {
      let type = 'other'
      const { message, timestamp, senderId } = data
      if (senderId === userId) type = 'me'
      setMessageList((prev) => [
        ...prev,
        { message, type, timestamp, senderId },
      ])
    })

    return () => {
      socket.off()
    }
  }, [socket])

  const handleSubmit = (message: string) => {
    socket.emit('send-message', {
      message: message,
      roomId: params.id,
      senderId: userId,
      timestamp: new Date().getTime(),
    })
  }
  return (
    <div className="mb-16 w-full">
      <ChatHeader />
      <div className="m-4">
        {messageList.map(({ message, type, timestamp, senderId }) => (
          <Message
            key={`${timestamp}_${senderId}`}
            content={message}
            senderId={senderId}
            timestamp={timestamp}
            type={type}
          />
        ))}
      </div>
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  )
}
