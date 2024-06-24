import { CreatePopUpSchema } from '../../schema/pop-up'

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
    category: string
    subTitle: string
    openTime?: string
    closeTime?: string
    chatRoomId: string
    tags: string[]
    authorId: string
    fullAddress: string
    addressDetail: string
    isAvailable: boolean
    latitude?: number
    longitude?: number
  }

export type PopUpQuery = {
  category?: string | string[]
  search?: string
  isAvailable?: boolean
  inProgress?: boolean
}

export type PopUpCategory = {
  value: string
  label: string
}

export type CreateBasicPopUpInfo = Partial<CreatePopUpSchema> & {
  content?: string
  imageList?: string[]
  latitude?: number
  longitude?: number
}
