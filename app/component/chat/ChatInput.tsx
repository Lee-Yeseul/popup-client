'use client'
import BottomBox from '../common/BottomBox'
import Send from '@/public/assets/icons/send.svg'

export default function ChatInput() {
  const onSubmit = () => {}
  return (
    <BottomBox>
      <div className="flex h-full w-full items-center justify-between gap-4">
        <form className="h-full grow" onSubmit={onSubmit}>
          <input
            placeholder="메시지 보내기"
            className="h-full w-full border-none p-4 focus:outline-none"
          />
        </form>
        <button className="px-3">
          <Send width="30" height="30" fill="#6b7280" />
        </button>
      </div>
    </BottomBox>
  )
}
