interface MessageProps {
  content: string
  timestamp: number
  senderId: string
  type: 'me' | 'other'
}
export default function Message({
  content,
  timestamp,
  senderId,
  type,
}: MessageProps) {
  const time = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
  return (
    <div>
      {type === 'other' ? (
        <div className="w-fit max-w-96">
          <div className="g flex flex-col gap-1">
            <div className="ml-1 text-sm text-gray-500">말하는 오리너구리</div>
            <div className="flex items-end gap-2">
              <div className="rounded-lg bg-yellow-50 px-3 py-2.5 text-base/6">
                {content}
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
                className={`flex shrink-0 justify-end text-sm text-gray-400`}
              >
                {time}
              </div>
              <div>
                <div className="ml-1 text-sm text-gray-500">
                  말하는 오리너구리
                </div>
                <div className="rounded-lg bg-yellow-50 px-3 py-2.5 text-base/6">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
