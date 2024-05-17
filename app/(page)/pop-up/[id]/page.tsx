import ClockIcon from '@/public/assets/icons/clock.svg'
import LocationOn from '@/public/assets/icons/locationOn.svg'
import EventAvailable from '@/public/assets/icons/eventAvailable.svg'

import Tag from '@/app/src/component/common/Tag'
import ImageCarousel from '@/app/src/component/common/ImageCarausel'
import PopUpChat from '@/app/src/component/pop-up/PopUpChat'
import MarkdownViewer from '@/app/src/component/common/MarkdownViewer'
import PopUpDetailMap from '@/app/src/component/pop-up/popUpDetailMap'

import { convertDateToISOFormat } from '@/app/src/util'
import { popUpAPI } from '@/app/src/api/pop-up'

export default async function PopupDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const getPopUpDetail = async () => {
    const { data } = await popUpAPI.getPopUpDetail(id)
    return data
  }

  const {
    tags,
    chatRoomId,
    content,
    title,
    address,
    openTime,
    closeTime,
    startDate,
    endDate,
  } = await getPopUpDetail()

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
    <div className="mx-6 mt-16">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <div className="flex flex-col gap-2  ">
        <div>
          <ImageCarousel imageList={imageList} width={500} height={300} />
        </div>
        <div className="flex items-center gap-2">
          <EventAvailable width="22" height="22" fill="#6b7280" />
          <div className="font-semibold">
            {convertDateToISOFormat(startDate)} ~{' '}
            {convertDateToISOFormat(endDate)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon width="22" height="22" fill="#6b7280" />
          <div className="font-semibold">
            {openTime} ~ {closeTime}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LocationOn width="24" height="24" fill="#6b7280" />
          <div className="font-semibold">{address}</div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              value={tag}
              className="bg-green-500 text-base/6 text-green-50"
            />
          ))}
        </div>
      </div>
      <div>
        <div className="text-lg font-bold">What's about?</div>
        <div className="text-wrap text-base">
          <MarkdownViewer content={content} />
        </div>
      </div>
      <PopUpDetailMap />
      <PopUpChat roomId={chatRoomId} />
    </div>
  )
}
