import ArrowBack from '@/public/assets/icons/arrowBack.svg'
import MoreVert from '@/public/assets/icons/moreVert.svg'

export default function ChatHeader() {
  return (
    <div className="h-16 w-[550px] border-b-2 border-solid border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <ArrowBack width="24" height="24" fill="#6b7280" />
          <div className="text-lg font-semibold">이예슬</div>
        </div>
        <div>
          <MoreVert width="24" height="24" fill="#6b7280" />
        </div>
      </div>
    </div>
  )
}
