'use client'
import { useEffect, useState } from 'react'
import { popUpAPI } from '@/app/api/pop-up'
import { PopUpCategory } from '@/app/type/pop-up'
import SearchFilter from '@/app/component/common/SearchFilter'
import PopUpDashboard from '@/app/component/pop-up'

export default function PopUpListPage() {
  const [popUpCategoryList, setPopUpCategoryList] = useState<PopUpCategory[]>(
    [],
  )

  const getPopUpCategoryList = async () => {
    try {
      const { data } = await popUpAPI.getPopUpCategoryList()
      const parsedArray = Object.entries(data).map(([value, label]) => ({
        value,
        label,
      }))
      setPopUpCategoryList(parsedArray)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPopUpCategoryList()
  }, [])

  return (
    <div className="mx-6 mb-10 py-6">
      <div className="mb-6 flex h-48 w-full items-center justify-center bg-pink-50">
        배너
      </div>
      {popUpCategoryList && <SearchFilter filterList={popUpCategoryList} />}
      <PopUpDashboard />
    </div>
  )
}
