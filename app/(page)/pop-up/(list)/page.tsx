import SearchFilter from '@/app/src/component/common/SearchFilter'
import PopUpDashboard from '@/app/src/component/pop-up/PopUpDashboard'
import Banner from '@/app/src/component/pop-up/Banner'
import Divider from '@/app/src/component/common/Divider'
import { popUpAPI } from '@/app/src/api/pop-up'
import { Suspense } from 'react'

export async function generateMetadata() {
  const title = process.env.SERVICE_NAME
  const description = process.env.SERVICE_DESCRIPTION

  return {
    alternates: {
      canonical: '/pop-up',
    },
    openGraph: {
      title,
      description,
    },
  }
}

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
      <Suspense fallback={<Divider />}>
        {popUpCategoryList && <SearchFilter filterList={popUpCategoryList} />}
      </Suspense>
      <Divider />
      <PopUpDashboard />
    </main>
  )
}
