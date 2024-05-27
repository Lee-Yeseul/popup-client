import { popUpAPI } from '@/app/src/api/pop-up'
import PopUpCreateForm from '@/app/src/component/pop-up/PopUpCreateForm'

export default async function PopUpCreatePage() {
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
    <main>
      {popUpCategoryList && (
        <PopUpCreateForm categoryOptions={popUpCategoryList} />
      )}
    </main>
  )
}
