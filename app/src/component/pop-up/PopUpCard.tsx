import ClockIcon from '@/public/assets/icons/clock.svg'
import LocationOn from '@/public/assets/icons/locationOn.svg'
import EventAvailable from '@/public/assets/icons/eventAvailable.svg'

import Tag from '@/app/src/component/common/Tag'
import ImageCarousel from '@/app/src/component/common/ImageCarausel'
import { PopUpDetail } from '@/app/src/type/pop-up'
import { convertDateToISOFormat } from '@/app/src/util'

interface PopUpCardProps {
  popUpDetail: PopUpDetail
}
export default function PopUpCard({ popUpDetail }: PopUpCardProps) {
  const { title, tags, address, openTime, closeTime, startDate, endDate } =
    popUpDetail

  const imageList = [
    {
      id: 0,
      url: 'https://i.imgur.com/Tp9JfY2.jpeg',
    },
    {
      id: 1,
      url: 'https://i.imgur.com/cW0wMR6.jpeg',
    },
    {
      id: 2,
      url: 'https://i.imgur.com/7kmLp3v.jpeg',
    },
  ]

  return (
    <div className="my-2 flex flex-col gap-2">
      <ImageCarousel imageList={imageList} width={550} height={300} />

      <div className="mx-6">
        <h3 className="my-2 text-2xl font-bold">{title}</h3>
        <div className="flex flex-col gap-1 text-base/7 font-semibold">
          <div className="flex items-center gap-2">
            <EventAvailable width="22" height="22" fill="#1d1b78" />
            <div>
              {convertDateToISOFormat(startDate)} ~{' '}
              {convertDateToISOFormat(endDate)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon width="22" height="22" fill="#1d1b78" />
            <div>
              {openTime} ~ {closeTime}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LocationOn width="24" height="24" fill="#1d1b78" />
            <div>{address}</div>
          </div>
        </div>
        <div className="my-2 flex items-center gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              value={tag}
              className="bg-secondary-500 text-base/7 text-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
