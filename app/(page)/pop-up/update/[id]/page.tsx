import PopUpUpdateForm from '@/app/src/component/pop-up/PopUpUpdateForm'
import { popUpAPI } from '@/app/src/api/pop-up'

export default async function PopUpUpdatePage({
  params: { id },
}: {
  params: { id: string }
}) {
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

  const getPopUpDetail = async (popUpId: string) => {
    try {
      const { data } = await popUpAPI.getPopUpDetail(popUpId)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const popUpCategoryList = await getPopUpCategoryList()
  const popUpDetail = await getPopUpDetail(id)

  return (
    <main>
      {popUpCategoryList && popUpDetail && (
        <PopUpUpdateForm
          id={id}
          categoryOptions={popUpCategoryList}
          popUpDetail={popUpDetail}
        />
      )}
    </main>
  )
}
