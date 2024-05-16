import { create } from 'zustand'
import { PopUp } from '../type/pop-up'

type PopUpList = {
  popUpList: PopUp[]
}

type PopUpAction = {
  setPopUpList: (popUpList: PopUp[]) => void
}

export const usePopUpStore = create<PopUpList & PopUpAction>((set) => ({
  popUpList: [],
  setPopUpList: (popUpList) => set({ popUpList }),
}))
