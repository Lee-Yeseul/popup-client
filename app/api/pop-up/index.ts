import { APIResponse } from '@/app/type'
import { instance } from '..'
import { PopUp, PopUpDetail } from '@/app/type/pop-up'

export const popUpAPI = {
  getPopUpList: (): APIResponse<PopUp[]> => {
    return instance.get('/pop-up/list')
  },
  getPopUpDetail: (id: string): APIResponse<PopUpDetail> => {
    return instance.get(`/pop-up/${id}`)
  },
}
