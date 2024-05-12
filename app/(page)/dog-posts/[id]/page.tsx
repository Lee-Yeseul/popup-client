import { dogPostAPI } from '@/app/api/dog-posts'
import ImageBox from '@/app/component/common/ImageBox'
import Tag from '@/app/component/common/Tag'

export default async function DogPostDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const getDogPost = async () => {
    const { data: dogPostData } = await dogPostAPI.getDogPost(Number(id))
    return { dogPostData }
  }

  const {
    dogPostData: { dog, title, content, tags },
  } = await getDogPost()

  return (
    <div className="mx-6 py-6">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <div className="my-4 flex flex-col gap-2 rounded-sm border-1 border-solid border-gray-200 bg-white p-3">
        <div className={`relative h-48 w-full`}>
          <ImageBox imagePath={dog.imagePath} />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[#717171]">이름</div>
          <div className="font-semibold">{dog.name}</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[#717171]">나이</div>
          <div className="font-semibold">{dog.age}살</div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag} value={tag} className="bg-sky-100 text-sky-600" />
          ))}
        </div>
      </div>
      <div>
        <div className="text-lg font-bold">반려견 소개</div>
        <div className="text-wrap text-base">{content}</div>
      </div>
    </div>
  )
}
