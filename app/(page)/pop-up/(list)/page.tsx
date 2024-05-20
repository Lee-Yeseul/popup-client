'use client'
import { useEffect, useState } from 'react'
import SearchFilter from '@/app/src/component/common/SearchFilter'
import PopUpDashboard from '@/app/src/component/pop-up/PopUpDashboard'
import Banner from '@/app/src/component/pop-up/Banner'
import { PopUpCategory } from '@/app/src/type/pop-up'
import { popUpAPI } from '@/app/src/api/pop-up'
import Divider from '@/app/src/component/common/Divider'

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
    <main className="mt-16">
      <Banner />
      {popUpCategoryList && <SearchFilter filterList={popUpCategoryList} />}
      <Divider />
      <PopUpDashboard />
    </main>
  )
}
