import ImageCarousel from '@/app/component/common/ImageCarausel'
import Spinner from '@/app/component/common/Spinner'
import Tag from '@/app/component/common/Tag'
import { Suspense } from 'react'

interface FriendsDetailPageProps {
  params: { id: number }
}

export default function FriendsDetailPage({ params }: FriendsDetailPageProps) {
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

  const tempTag = ['말티즈', '11살', '물어요']

  return (
    <div className="mx-6 py-6">
      <h3 className="mb-2 text-xl font-bold">
        안녕하세요. 귀여운 강아지 슈입니다.
      </h3>
      <Suspense fallback={<Spinner />}>
        <ImageCarousel imageList={imageList} width={500} height={300} />
      </Suspense>

      <div className="my-4 flex flex-col gap-2 rounded-sm border-1 border-solid border-gray-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <div className="text-[#717171]">이름</div>
          <div className="font-semibold">슈</div>
        </div>
        {/* address */}
        <div className="flex items-center gap-2">
          <div className="text-[#717171]">주 활동영역</div>
          <div className="font-semibold">도봉구 방학동</div>
        </div>
        {/* hashtags */}
        <div className="mt-2 flex items-center gap-2">
          {tempTag.map((tag) => (
            <Tag key={tag} value={tag} className="bg-sky-100 text-sky-600" />
          ))}
        </div>
      </div>
      <div>
        <div className="text-lg font-bold">반려견 소개</div>
        <div className="text-wrap text-base">
          안녕하세요. 저희집 강아지 슈입니다. 11살 말티즈입니다. 너무 귀여운
          강아진데 사회성이 떨어져서 친구가 없습니다 ㅠㅠ 산책하며 지나가는
          강아지들과 잠시 만나도 봤지만 친구를 만들기가 쉽지 않았습니다.
          유치원은 경제적으로 부담이 되고 또 적응을 못할까봐 보낼 생각이
          없습니다. 자주 산책나가면서 서서히 친해질 친구를 찾고 있습니다.
          관심있으신분들은 연락부탁드립니다!
        </div>
      </div>
    </div>
  )
}
