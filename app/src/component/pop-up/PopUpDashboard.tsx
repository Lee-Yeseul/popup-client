'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Card from '@/app/src/component/common/Card'
import ImageBox from '@/app/src/component/common/ImageBox'
import Tag from '@/app/src/component/common/Tag'

import { usePopUpStore } from '@/app/src/store/popUpStore'
import { calculateDateDifference, convertDateToKor } from '@/app/src/util/date'
import { PopUp } from '@/app/src/type/pop-up'

interface PopUpDashboardProps {
  dataList?: PopUp[]
}

export default function PopUpDashboard({ dataList }: PopUpDashboardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(useSearchParams())
  const [isChecked, setIsChecked] = useState(false)

  const onClickToggle = async () => {
    try {
      params.set('inProgress', String(isChecked))
      router.push(`${pathname}?${params.toString()}`, { scroll: false })

      setIsChecked(!isChecked)
    } catch (error) {
      console.log(error)
    }
  }

  const { popUpList } = usePopUpStore()

  const getStatus = (startDate: Date, endDate: Date) => {
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    if (today < startDate) {
      const daysUntilStart = calculateDateDifference(startDate, today)
      return `${daysUntilStart}일 후 시작`
    }
    if (today > endDate) {
      return '종료됨'
    }

    const daysUntilEnd = calculateDateDifference(endDate, today)
    return `${daysUntilEnd}일 후 종료`
  }

  const selectedPopUpList = dataList || popUpList

  return (
    <>
      <div className="my-3 mr-4 flex justify-end">
        <label className="inline-flex cursor-pointer items-center">
          <span className="mr-3 font-medium text-gray-600 dark:text-gray-300">
            {'종료된 팝업 함께 보기'}
          </span>
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={isChecked}
            onChange={onClickToggle}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        </label>
      </div>
      <div className="mx-6 mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {selectedPopUpList.map(
          ({ title, startDate, endDate, id, address, imageList }) => (
            <Link href={`/pop-up/${id}`} key={id}>
              <Card className="hover:cursor-pointer">
                <div className="relative">
                  <div className="absolute left-0 right-0 z-10 mr-1 mt-1 flex justify-end">
                    <Tag
                      value={getStatus(new Date(startDate), new Date(endDate))}
                      className="bg-clip-text text-base/7 font-semibold text-white backdrop-blur-sm"
                    />
                  </div>
                </div>
                {imageList && (
                  <ImageBox
                    imagePath={`pop-up/${imageList[0]}`}
                    className="aspect-square xs:h-56 xs:w-full"
                  />
                )}
                <Card.Description>
                  <div className="text-sm text-gray-500">
                    <h2 className="mt-1 text-base font-bold text-black">
                      {title}
                    </h2>
                    <div className="text-sm text-gray-500">{address}</div>
                    {convertDateToKor(startDate)}
                    <span className="mx-0.5">~</span>
                    {convertDateToKor(endDate)}
                  </div>
                </Card.Description>
              </Card>
            </Link>
          ),
        )}
      </div>
    </>
  )
}
