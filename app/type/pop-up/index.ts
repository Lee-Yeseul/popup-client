export type PopUp = {
  id: string
  title: string
  content: string
  tags: string[]
  address: string
  startDate: Date
  endDate: Date
  imageList: string[]
}

export type PopUpDetail = PopUp & {
  type: string
  latitude: number
  longitude: number
  openTime: string
  closeTime: string
  chatRoomId: string
  authorId: string
}
