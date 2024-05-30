'use client'

import { useEffect, useState } from 'react'
import PopUpDashboard from '@/app/src/component/pop-up/PopUpDashboard'
import { popUpAPI } from '@/app/src/api/pop-up'
import { PopUp } from '@/app/src/type/pop-up'
import Link from 'next/link'

export default function MyPage() {
  const [dataList, setDataList] = useState<PopUp[]>([])

  const getMyPopUpList = async () => {
    const { data } = await popUpAPI.getMyPopUpList()
    setDataList(data)
  }

  useEffect(() => {
    getMyPopUpList()
  }, [])

  return (
    <main className="min-h-[90vh]">
      <div className="mx-6 mt-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary-500">내가 등록한 팝업</h3>
        <Link
          href={'/pop-up/create'}
          className="rounded-md bg-primary-500 p-2.5 text-white hover:cursor-pointer"
        >
          팝업 등록하기
        </Link>
      </div>
      {dataList && <PopUpDashboard dataList={dataList} />}
    </main>
  )
}
