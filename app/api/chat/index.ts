import { instance } from '..'

export const chatAPI = {
  getChatListByRoomId: async (roomId: string) => {
    return await instance.get(`/chat/${roomId}`)
  },
}
