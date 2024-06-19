export type ChatMessageType = 'me' | 'other'

export type ChatMessage = {
  message: string
  timestamp: Date
  senderId: string
}

export type ChatMessageResponse = ChatMessage & {
  id: string
}
