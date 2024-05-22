import { ChatMessage } from '@/app/src/type/chat'
import { useContext } from 'react'
import { ChatContext } from '.'

export default function Message({ message, timestamp, senderId }: ChatMessage) {
  const { currentUserId } = useContext(ChatContext)
  const time = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
  return (
    <div className="my-2.5">
      {currentUserId !== senderId ? (
        <div className="w-fit max-w-96">
          <div className="g flex flex-col gap-1">
            <div className="ml-1 text-sm text-secondary-500">{senderId}</div>
            <div className="flex items-end gap-2">
              <div className="rounded-lg bg-primary-200 px-3 py-2.5 text-base/6">
                {message}
              </div>
              <div
                className={`flex shrink-0 justify-end text-sm text-gray-400`}
              >
                {time}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-4 flex w-full justify-end">
          <div className="w-fit max-w-96">
            <div className="flex items-end">
              <div
                className={`mx-2 flex shrink-0 justify-end text-sm text-gray-400`}
              >
                {time}
              </div>
              <div>
                <div className="ml-1 text-sm text-secondary-500">
                  {senderId}
                </div>
                <div className="rounded-lg bg-primary-200 px-3 py-2.5 text-base/6">
                  {message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
