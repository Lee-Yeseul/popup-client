import { useContext, useEffect, useRef } from 'react'
import Message from './Message'
import { ChatContext } from '.'

export default function ChatBody() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { messageList } = useContext(ChatContext)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messageList])

  return (
    <div className="max-h-60 min-h-20 overflow-y-scroll">
      {messageList.map(({ message, timestamp, senderId }) => (
        <Message
          key={`${timestamp}_${senderId}`}
          message={message}
          senderId={senderId}
          timestamp={timestamp}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  )
}
