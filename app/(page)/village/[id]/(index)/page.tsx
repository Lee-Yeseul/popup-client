import ImageCarousel from '@/app/component/common/ImageCarausel'
import Tag from '@/app/component/common/Tag'
import ReviewCard from '@/app/component/village/ReviewCard'
import ClockIcon from '@/public/assets/icons/clock.svg'
import LocationOn from '@/public/assets/icons/locationOn.svg'

export default function VillageDetailPage() {
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

  const arr = Array.from({ length: 3 }, (_, i) => i)
  return (
    <div className="mb-16">
      <ImageCarousel imageList={imageList} width={550} height={300} />
      <div className="mx-4 my-4 flex flex-col gap-2">
        <div className="text-xl font-bold">어린이 대공원</div>
        <Tag
          value="반려견 놀이터"
          className="w-fit bg-green-500 text-base/6 text-green-50"
        />
        <div className="flex items-center gap-1">
          <LocationOn width="24" height="24" fill="#6b7280" />
          서울시 광진구 능동로 216(구의문 주차장 옆)
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon width="23" height="23" fill="#6b7280" />
          24시간 상시 개방
        </div>
      </div>
      <div className="border-t-1 border-solid border-gray-300 py-4">
        <div className="px-4 text-lg font-semibold">
          다른 반려견들의 방문 기록
        </div>
        <div className="flex flex-col divide-y-1 divide-solid divide-gray-300">
          {arr.map((_, i) => (
            <ReviewCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
