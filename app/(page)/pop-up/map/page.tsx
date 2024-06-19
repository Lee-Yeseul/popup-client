import NearbyPopUpMap from '@/app/src/component/map/NearbyPopUpMap'

export async function generateMetadata() {
  const title = process.env.SERVICE_NAME
  const description = '팝업 지도 확인하기'

  return {
    title,
    alternates: {
      canonical: `/pop-up/map`,
    },
    openGraph: {
      title,
      description,
    },
  }
}

export default function MapPage() {
  return (
    <main className="relative flex h-[100vh] w-full flex-col items-center justify-center">
      <NearbyPopUpMap />
    </main>
  )
}
