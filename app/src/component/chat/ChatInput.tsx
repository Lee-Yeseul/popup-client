'use client'
import { FormEvent, useContext, useState } from 'react'
import Send from '@/public/assets/icons/send.svg'
import { useSocket } from './SocketProvider'
import { ChatContext } from '.'

interface ChatInputProps {
  handleSubmit?: () => void
}
export default function ChatInput({ handleSubmit }: ChatInputProps) {
  const { roomId, currentUserId } = useContext(ChatContext)
  const { socket } = useSocket()
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('send-message', {
      message,
      roomId,
      senderId: currentUserId,
      timestamp: new Date(),
    })
    setMessage('')
    handleSubmit?.()
  }
  return (
    <form className="h-full grow" onSubmit={onSubmit}>
      <div className="flex h-full w-full items-center justify-between gap-4">
        <input
          placeholder="메시지 보내기"
          className="h-full w-full border-none p-4 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="px-3" type="submit">
          <Send width="30" height="30" fill="#6b7280" />
        </button>
      </div>
    </form>
  )
}
