import ExpandLess from '@/public/assets/icons/expandLess.svg'
import ExpandMore from '@/public/assets/icons/expandMore.svg'
import { useState } from 'react'

export default function ChatHeader() {
  const [isChatOpen, setIsChatOpen] = useState(true)
  return (
    <div className="border-b-2 border-solid border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <div className="text-lg font-semibold"></div>
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
    </div>
  )
}
