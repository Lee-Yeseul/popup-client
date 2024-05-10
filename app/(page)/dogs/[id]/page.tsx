import { dogAPI } from '@/app/api/dog'
import { imageAPI } from '@/app/api/image'
import Avatar from '@/app/component/common/Avatar'
import Link from 'next/link'

export default async function DogDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  let imageUrl = ''
  const { data } = await dogAPI.getDog(Number(id))
  const { imagePath, name, age } = data

  if (imagePath) {
    const { body } = await imageAPI.getImagePresignedUrl(imagePath)
    imageUrl = body
  }

  return (
    <div className="flex w-full flex-col">
      <div className="my-5 flex items-center">
        <div className="mx-10 flex flex-col items-center gap-5">
          <Avatar alt="dog_profile" width="w-24" height="h-24" src={imageUrl} />
          <div>
            {name}({age}살)
          </div>
        </div>

        <div className="mx-10 mb-5 flex w-full items-center justify-between">
          <div className="flex flex-col gap-2.5 text-center">
            <div>이번달 기록 수</div>
            <div>5</div>
          </div>
          <div className="flex flex-col gap-2.5 text-center">
            <div>팔로워</div>
            <div>5</div>
          </div>
          <div className="flex flex-col gap-2.5 text-center">
            <div>팔로잉</div>
            <div>5</div>
          </div>
        </div>
      </div>
      <div className="my-10 w-full">
        <Link href={`/dogs/${id}/edit`}>
          <div className="mx-5 bg-yellow-200 py-5 text-center">프로필 수정</div>
        </Link>
      </div>
    </div>
  )
}
