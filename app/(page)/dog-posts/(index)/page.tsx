import { dogPostAPI } from '@/app/api/dog-posts'
import Dashboard from '@/app/component/friends'

export default async function DogPostPage() {
  const getDogPost = async () => {
    try {
      const { data } = await dogPostAPI.getDogPosts()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const dogPostList = await getDogPost()
  return (
    <div className="mx-6 mb-10 py-6">
      <div className="mb-6 flex h-48 w-full items-center justify-center bg-pink-50">
        설명 글 자리
      </div>
      {dogPostList && <Dashboard dataList={dogPostList} />}
    </div>
  )
}
