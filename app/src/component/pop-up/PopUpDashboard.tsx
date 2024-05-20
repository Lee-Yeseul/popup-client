'use client'
import Link from 'next/link'
import Card from '../common/Card'
import { usePopUpStore } from '../../store/popUpStore'
import { convertDateToKor } from '../../util'
import ImageBox from '../common/ImageBox'

export default function PopUpDashboard() {
  const { popUpList } = usePopUpStore()

  return (
    <div className="mx-6 my-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {popUpList.map(({ title, startDate, endDate, id, address }) => (
        <Link href={`/pop-up/${id}`} key={id}>
          <Card className="hover:cursor-pointer">
            <div className={`relative h-52 w-full`}>
              <div className="absolute bottom-0 left-0 z-10">
                <div className="mx-2 mt-1 text-xl font-bold text-white">
                  {title}
                </div>
              </div>

              <ImageBox imagePath={'stanley.png'} />
            </div>
            <Card.Description>
              <div className="text-sm text-gray-500">
                {convertDateToKor(startDate)}
                <span className="mx-0.5">~</span>
                {convertDateToKor(endDate)}
              </div>
              <div className="text-sm text-gray-500">{address}</div>
            </Card.Description>
          </Card>
        </Link>
      ))}
    </div>
  )
}
