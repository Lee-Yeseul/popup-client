import { popUpAPI } from '@/app/api/pop-up'
import Dashboard from '@/app/component/pop-up'

export default async function PopUpListPage() {
  const getPopUpList = async () => {
    try {
      const { data } = await popUpAPI.getPopUpList()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const popUpList = await getPopUpList()
  return (
    <div className="mx-6 mb-10 py-6">
      <div className="mb-6 flex h-48 w-full items-center justify-center bg-pink-50">
        배너
      </div>
      {popUpList && <Dashboard dataList={popUpList} />}
    </div>
  )
}
