export type PopUp = {
  id: string
  title: string
  content: string
  address: string
  startDate: Date
  endDate: Date
  imageList: string[]
}

export type PopUpLocationInfo = {
  latitude: number
  longitude: number
  title: string
}

export type PopUpDetail = PopUp &
  PopUpLocationInfo & {
    type: string
    openTime: string
    closeTime: string
    chatRoomId: string
    tags: string[]
    authorId: string
    fullAddress: string
    addressDetail: string
  }

export type PopUpQuery = {
  category?: string | string[]
  search?: string
}

export type PopUpCategory = {
  value: string
  label: string
}
