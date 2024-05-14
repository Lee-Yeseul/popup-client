'use client'

import { useState } from 'react'
import ExpandLess from '@/public/assets/icons/expandLess.svg'
import ExpandMore from '@/public/assets/icons/expandMore.svg'
import SocketProvider from '@/app/component/chat/SocketProvider'
import Chat from '../chat'

interface PopUpChatProps {
  roomId: string
}

const userId = Math.random()

export default function PopUpChat({ roomId }: PopUpChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(true)

  return (
    <>
      <div className="flex h-full items-center justify-between">
        <div className="text-lg font-bold">
          실시간 채팅
          <span className="ml-2 text-sm text-gray-500">
            실시간으로 현장 상황을 공유해주세요!
          </span>
        </div>
        {isChatOpen ? (
          <button onClick={() => setIsChatOpen(false)}>
            <ExpandLess width="32" height="32" fill="#6b7280" />
          </button>
        ) : (
          <button onClick={() => setIsChatOpen(true)}>
            <ExpandMore width="32" height="32" fill="#6b7280" />
          </button>
        )}
      </div>

      <SocketProvider>
        <Chat roomId={roomId} senderId={String(userId)}>
          {isChatOpen && (
            <div>
              <Chat.Body />
              <Chat.Input />
            </div>
          )}
        </Chat>
      </SocketProvider>
    </>
  )
}
