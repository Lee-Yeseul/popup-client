import { ReactNode, createContext, useEffect, useState } from 'react'
import ChatBody from './ChatBody'
import ChatInput from './ChatInput'
import { useSocket } from './SocketProvider'
import { chatAPI } from '@/app/api/chat'
import { ChatMessage, ChatMessageType } from '@/app/type/chat'

interface ChatProps {
  children: ReactNode
  roomId: string
  senderId: string
}

type ChatContextValue = {
  roomId: string
  senderId: string
  messageList: ChatMessage[]
}

export const ChatContext = createContext<ChatContextValue>({
  roomId: '',
  senderId: '',
  messageList: [
    { message: '', type: 'other', timestamp: new Date(), senderId: '' },
  ],
})

export default function Chat({ children, roomId, senderId }: ChatProps) {
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
      let type: ChatMessageType = 'other'
      const { message, timestamp, senderId: currentSenderId } = data
      if (currentSenderId === senderId) type = 'me'
      setMessageList((prev) => [
        ...prev,
        { message, type, timestamp, senderId },
      ])
    })

    return () => {
      socket.off()
    }
  }, [socket])
  return (
    <ChatContext.Provider value={{ roomId, senderId, messageList }}>
      {children}
    </ChatContext.Provider>
  )
}

Chat.Input = ChatInput
Chat.Body = ChatBody
