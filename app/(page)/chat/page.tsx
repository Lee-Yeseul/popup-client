import ChatHeader from '@/app/component/chat/ChatHeader'
import ChatInput from '@/app/component/chat/ChatInput'
import Message from '@/app/component/chat/Message'
import MyMessage from '@/app/component/chat/MyMessage'

export default function Chat() {
  return (
    <div className="mb-16 w-full">
      <ChatHeader />
      <div className="m-4">
        <Message />
        <MyMessage />
      </div>
      <ChatInput />
    </div>
  )
}
