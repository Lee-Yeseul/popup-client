import Tag from '@/app/component/common/Tag'
import ClockIcon from '@/public/assets/icons/clock.svg'
import LocationOn from '@/public/assets/icons/locationOn.svg'
import EventAvailable from '@/public/assets/icons/eventAvailable.svg'
import { popUpAPI } from '@/app/api/pop-up'
import ImageCarousel from '@/app/component/common/ImageCarausel'
import PopUpChat from '@/app/component/pop-up/PopUpChat'

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

  const { tags, chatRoomId } = await getPopUpDetail()

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
    <div className="mx-6 py-6">
      <h3 className="mb-2 text-xl font-bold">
        토니모리 팝업 스토어: 겟잇베이크샵
      </h3>

      <div className="flex flex-col gap-2  ">
        <div>
          <ImageCarousel imageList={imageList} width={500} height={300} />
        </div>
        <div className="flex items-center gap-2">
          <EventAvailable width="22" height="22" fill="#6b7280" />
          <div className="font-semibold">2024-05-12 ~ 2024-05-12</div>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon width="22" height="22" fill="#6b7280" />
          <div className="font-semibold">11:00 ~ 22:00</div>
        </div>
        <div className="flex items-center gap-2">
          <LocationOn width="24" height="24" fill="#6b7280" />
          <div className="font-semibold">성동구 연무장길 47, 마를리카페</div>
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
          토니모리의 첫번째 팝업 스토어 겟잇 베이크샵이 성수동에 문을
          열었습니다. 이번 팝업은 빵지순례 콘셉트로, 💛 보기만 해도 고소한 빵
          냄새 가득! 다양한 포토존 💛 각종 베이커리 샵에서 진행하는 게임! 💛
          신제품 “워터풀버터 NEW컬러 빵지순례 시리즈” 등 즐길 거리가
          넘쳐난다구👀
        </div>
      </div>

      <PopUpChat roomId={chatRoomId} />
    </div>
  )
}
