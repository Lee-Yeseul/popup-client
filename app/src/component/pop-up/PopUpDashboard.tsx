'use client'
import Link from 'next/link'
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
    <div className="mx-6 my-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {selectedPopUpList.map(
        ({ title, startDate, endDate, id, address, imageList }) => (
          <Link href={`/pop-up/${id}`} key={id}>
            <Card className="hover:cursor-pointer">
              <div className={`relative h-52 w-full`}>
                <div className="absolute left-0 right-0 z-10">
                  <div className="mr-1 mt-1 flex justify-end">
                    <Tag
                      value={getStatus(new Date(startDate), new Date(endDate))}
                      className="bg-clip-text text-base/7 font-semibold text-white backdrop-blur-sm"
                    ></Tag>
                  </div>
                </div>

                {imageList && <ImageBox imagePath={`pop-up/${imageList[0]}`} />}
              </div>
              <Card.Description>
                <div className="text-sm text-gray-500">
                  <div className="mt-1 text-base font-bold text-black">
                    {title}
                  </div>
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
  )
}
