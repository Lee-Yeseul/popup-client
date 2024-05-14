export type ChatMessageType = 'me' | 'other'

export type ChatMessage = {
  message: string
  type: ChatMessageType
  timestamp: Date
  senderId: string
}
