'use client'

import { Suspense, useEffect, useState } from 'react'
import PopUpDashboard from '@/app/src/component/pop-up/PopUpDashboard'
import { popUpAPI } from '@/app/src/api/pop-up'
import { PopUp } from '@/app/src/type/pop-up'
import Link from 'next/link'
import useUserAction from '@/app/src/hook/useUserAction'
import { useRouter } from 'next/navigation'
import { userAPI } from '@/app/src/api/user'
import DashboardFallback from '@/app/src/component/common/DashboardFallback'

export default function MyPage() {
  const router = useRouter()
  const [dataList, setDataList] = useState<PopUp[]>([])
  const { logout, saveUserInfo } = useUserAction()

  const getMyPopUpList = async () => {
    try {
      const { data } = await popUpAPI.getMyPopUpList()
      setDataList(data)
    } catch (error) {
      console.log(error)
    }
  }

  const onClickLogout = () => {
    logout()
    router.push('/')
  }

  const getUserInfo = async () => {
    const { data } = await userAPI.getUserInfo()
    saveUserInfo(data)
  }

  useEffect(() => {
    getMyPopUpList()
    getUserInfo()
  }, [])

  return (
    <main className="min-h-[90vh]">
      <div className="mx-6 mt-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary-500">내가 등록한 팝업</h3>
        <div>
          <Link
            href={'/pop-up/create'}
            className="mr-4 rounded-md bg-primary-500 p-2.5 text-white hover:cursor-pointer"
          >
            팝업 등록하기
          </Link>
          <button
            onClick={onClickLogout}
            className="rounded-md bg-primary-500 p-2.5 text-white"
          >
            로그아웃
          </button>
        </div>
      </div>
      <Suspense fallback={<DashboardFallback />}>
        {dataList && <PopUpDashboard dataList={dataList} />}
      </Suspense>
    </main>
  )
}
