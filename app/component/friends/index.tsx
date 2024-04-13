'use client'
import { useRouter } from 'next/navigation'
import Card from '../common/Card'
import ImageCarousel from '../common/ImageCarausel'
import { Suspense } from 'react'
import Spinner from '../common/Spinner'

export default function Dashboard() {
  const router = useRouter()
  const mockImgURL = {
    title: '귀여운 강아지 슈',
    address: '서울시 도봉구',
    hashTags: ['말티즈', '11살'],
    description: '귀여운 말티즈 우리집 슈',
    imageList: [
      {
        id: 0,
        url: 'https://i.imgur.com/7kmLp3v.jpeg',
      },
      {
        id: 1,
        url: 'https://i.imgur.com/cW0wMR6.jpeg',
      },
      {
        id: 2,
        url: 'https://i.imgur.com/Tp9JfY2.jpeg',
      },
    ],
  }

  const tempCard = Array.from({ length: 20 }, (_, idx) => ({
    id: idx,
    ...mockImgURL,
  }))

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 ">
      {tempCard.map(({ imageList, title, address, hashTags, id }) => (
        <Card key={id} className="hover:cursor-pointer">
          <div>
            <Card.Images>
              <Suspense fallback={<Spinner />}>
                <ImageCarousel imageList={imageList} width={250} height={250} />
              </Suspense>
            </Card.Images>
            <Card.Description>
              <div className="font-bold">{title}</div>
              <div className="text-sm">{address}</div>
              <div className="flex gap-2">
                {hashTags.map((tag) => (
                  <div
                    key={id + tag}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <span>#{tag}</span>
                  </div>
                ))}
              </div>
            </Card.Description>
          </div>
        </Card>
      ))}
    </div>
  )
}
