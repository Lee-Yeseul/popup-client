import { ReactNode, createContext, useEffect, useState } from 'react'
import ChatBody from './ChatBody'
import ChatInput from './ChatInput'
import { useSocket } from './SocketProvider'

import { ChatMessage } from '@/app/src/type/chat'
import { chatAPI } from '../../api/chat'

interface ChatProps {
  children: ReactNode
  roomId: string
  currentUserId: string
}

type ChatContextValue = {
  roomId: string
  currentUserId: string
  messageList: ChatMessage[]
}

export const ChatContext = createContext<ChatContextValue>({
  roomId: '',
  currentUserId: '',
  messageList: [{ message: '', timestamp: new Date(), senderId: '' }],
})

export default function Chat({ children, roomId, currentUserId }: ChatProps) {
  const [messageList, setMessageList] = useState<ChatMessage[]>([])
  const { socket } = useSocket()

  const getMessageList = async () => {
    const { data: chat } = await chatAPI.getChatListByRoomId(roomId)
    const reversedChatList = chat.reverse()
    setMessageList(reversedChatList)
  }
  useEffect(() => {
    getMessageList()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.emit('join-room', { roomId: roomId })

    socket.on('new-message', (data: ChatMessage) => {
      const { message, timestamp, senderId } = data
      setMessageList((prev) => [...prev, { message, timestamp, senderId }])
    })

    return () => {
      socket.off()
    }
  }, [socket])
  return (
    <ChatContext.Provider value={{ roomId, currentUserId, messageList }}>
      {children}
    </ChatContext.Provider>
  )
}

Chat.Input = ChatInput
Chat.Body = ChatBody
