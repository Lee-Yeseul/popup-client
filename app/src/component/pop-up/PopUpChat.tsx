'use client'

import { useEffect, useState } from 'react'
import ExpandLess from '@/public/assets/icons/expandLess.svg'
import ExpandMore from '@/public/assets/icons/expandMore.svg'
import SocketProvider from '@/app/src/component/chat/SocketProvider'
import Chat from '@/app/src/component/chat'
import { randomNicknameGenerator } from '@/app/src/util/randomNicknameGenerator'
import { useUserStore } from '@/app/src/store/userStore'

interface PopUpChatProps {
  roomId: string
}

export default function PopUpChat({ roomId }: PopUpChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const { username, update } = useUserStore()

  useEffect(() => {
    if (username) return
    update({ username: randomNicknameGenerator() })
  }, [])

  return (
    <>
      <div className="my-2 flex h-full items-center justify-between">
        <div className="mx-6 text-xl font-bold text-secondary-500">
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
        <Chat roomId={roomId} currentUserId={String(username)}>
          {isChatOpen && (
            <>
              <div className="border-y-2 border-solid border-neutral-100 px-6">
                <Chat.Body />
              </div>
              <div className="px-3">
                <Chat.Input />
              </div>
            </>
          )}
        </Chat>
      </SocketProvider>
    </>
  )
}
