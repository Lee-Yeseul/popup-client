import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '.'
import useDetectElement from '@/app/src/hook/useDetectElement'

export default function ChatBody() {
  const [passed, setPassed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { messageList } = useContext(ChatContext)
  let lastDate = new Date('2000-01-01')

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
        {messageList.map(({ message, timestamp, senderId }) => {
          const messageDate = new Date(timestamp)
          const showDateSeparator =
            messageDate.toDateString() !== lastDate.toDateString()

          lastDate = messageDate
          return (
            <div key={`${timestamp}_${senderId}`}>
              {showDateSeparator && (
                <div className="my-2 text-center text-gray-400">
                  {messageDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
              <Message
                message={message}
                senderId={senderId}
                timestamp={timestamp}
              />
            </div>
          )
        })}
        <div ref={scrollRef}></div>
      </div>
    </div>
  )
}
