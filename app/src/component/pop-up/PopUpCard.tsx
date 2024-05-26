import LocationOn from '@/public/assets/icons/locationOn.svg'
import EventAvailable from '@/public/assets/icons/eventAvailable.svg'

import Tag from '@/app/src/component/common/Tag'
import ImageCarousel from '@/app/src/component/common/ImageCarausel'
import { PopUpDetail } from '@/app/src/type/pop-up'
import { convertDateToISOFormat } from '@/app/src/util/date'
import { imageAPI } from '@/app/src/api/image'

interface PopUpCardProps {
  popUpDetail: PopUpDetail
}
export default async function PopUpCard({ popUpDetail }: PopUpCardProps) {
  const {
    title,
    subTitle,
    tags,
    fullAddress,
    addressDetail,
    startDate,
    endDate,
    imageList,
  } = popUpDetail

  const getImageSource = async () => {
    const imageSourceList = []
    for (let i = 0; i < imageList.length; i++) {
      const s3ImageUrl = await imageAPI.getImagePresignedUrl(
        `pop-up/${imageList[i]}`,
      )
      imageSourceList.push({
        id: i,
        url: s3ImageUrl,
      })
    }
    return imageSourceList
  }

  const imageSourceList = await getImageSource()

  return (
    <div className="my-2 flex flex-col gap-2">
      <ImageCarousel imageList={imageSourceList} />

      <div className="mx-6">
        <h3 className="my-2 text-2xl font-bold">{title}</h3>
        <div className="flex flex-col gap-1 text-base/7 font-semibold">
          <div>{subTitle}</div>
          <div className="flex items-center gap-2">
            <EventAvailable width="24" height="24" fill="#1d1b78" />
            <div>
              {convertDateToISOFormat(startDate)} ~{' '}
              {convertDateToISOFormat(endDate)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LocationOn width="24" height="24" fill="#1d1b78" />
            <div>{`${fullAddress}, ${addressDetail}`}</div>
          </div>
        </div>
        <div className="my-2 flex items-center gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              value={tag}
              className="bg-secondary-500 text-sm/7 text-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
