import { IndexSignature } from '@/app/src/type'
import { fetchAPI } from '..'
import {
  CreateBasicPopUpInfo,
  PopUp,
  PopUpDetail,
  PopUpLocationInfo,
  PopUpQuery,
} from '@/app/src/type/pop-up'
import { queryStringify } from '../../util'

const basicPathName = 'pop-up'

export const popUpAPI = {
  getPopUpList: (query?: PopUpQuery) => {
    if (!query) return fetchAPI.get<null, PopUp[]>(`${basicPathName}/list`)

    const queryString = queryStringify(query).toString()
    return fetchAPI.get<null, PopUp[]>(`${basicPathName}/list?${queryString}`)
  },
  getMyPopUpList: () => {
    return fetchAPI.get<null, PopUp[]>(`${basicPathName}/list/me`)
  },
  getPopUpDetail: (id: string) => {
    return fetchAPI.get<null, PopUpDetail>(`${basicPathName}/${id}`)
  },
  getPopUpCategoryList: () => {
    return fetchAPI.get<null, IndexSignature>(`${basicPathName}/category`)
  },
  getPopUpMapList: () => {
    return fetchAPI.get<null, PopUpLocationInfo[]>(`${basicPathName}/map/list`)
  },
  postPopUp: (data: CreateBasicPopUpInfo) => {
    return fetchAPI.post<CreateBasicPopUpInfo, IndexSignature>(
      `${basicPathName}`,
      data,
    )
  },
  putPopUpById: (id: string, data: Partial<CreateBasicPopUpInfo>) => {
    return fetchAPI.put<CreateBasicPopUpInfo, IndexSignature>(
      `${basicPathName}/${id}`,
      data,
    )
  },
  putPopUpIsAvailableById: (id: string, isAvailable: boolean) => {
    return fetchAPI.put<{ isAvailable: boolean }, IndexSignature>(
      `${basicPathName}/${id}`,
      { isAvailable },
    )
  },
  deletePopUpById: (id: string) => {
    return fetchAPI.delete(`${basicPathName}/${id}`)
  },
  getPopularPopUp: (take: number) => {
    return fetchAPI.get<null, PopUp[]>(`${basicPathName}/popular/${take}`)
  },
}
