import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '.'
import useDetectElement from '@/app/src/hook/useDetectElement'

export default function ChatBody() {
  const [passed, setPassed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { messageList } = useContext(ChatContext)

  const [targetRef] = useDetectElement({
    threshold: 1,
    onIntersect: useCallback(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          if (!scrollRef.current) return
          if (!passed) {
            setPassed(true)
            scrollRef.current.scrollIntoView({
              block: 'end',
              inline: 'nearest',
            })
          }
        }
      },
      [passed],
    ),
  })

  useEffect(() => {
    if (!scrollRef.current) return

    if (passed) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }
  }, [messageList])

  return (
    <div className="max-h-64 min-h-20 overflow-y-scroll" ref={targetRef}>
      <div>
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
    </div>
  )
}
