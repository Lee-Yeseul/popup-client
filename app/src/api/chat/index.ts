import { fetchAPI } from '..'
import { ChatMessageResponse } from '../../type/chat'

export const chatAPI = {
  getChatListByRoomId: async (roomId: string) => {
    return await fetchAPI.get<null, ChatMessageResponse[]>(`chat/${roomId}`)
  },
}
