import SearchFilter from '@/app/src/component/common/SearchFilter'
import PopUpDashboard from '@/app/src/component/pop-up/PopUpDashboard'
import Banner from '@/app/src/component/pop-up/Banner'
import Divider from '@/app/src/component/common/Divider'
import { popUpAPI } from '@/app/src/api/pop-up'

export default async function PopUpListPage() {
  const getPopUpCategoryList = async () => {
    try {
      const { data } = await popUpAPI.getPopUpCategoryList()
      const parsedArray = Object.entries(data).map(([value, label]) => ({
        value,
        label,
      }))
      return parsedArray
    } catch (error) {
      console.log(error)
    }
  }

  const popUpCategoryList = await getPopUpCategoryList()

  return (
    <main className="mt-16">
      <Banner />

      {popUpCategoryList && <SearchFilter filterList={popUpCategoryList} />}
      <Divider />
      <PopUpDashboard />
    </main>
  )
}
