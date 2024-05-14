import { dogPostAPI } from '@/app/api/dog-posts'
import Dashboard from '@/app/component/friends'

export default async function MyPage() {
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
      <div>내가 좋아요 누른 팝업</div>
      {dogPostList && <Dashboard dataList={dogPostList} />}
    </div>
  )
}
