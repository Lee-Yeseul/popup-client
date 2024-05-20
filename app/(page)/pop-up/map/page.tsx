import Script from 'next/script'
import NearbyPopUpMap from '@/app/src/component/map/NearbyPopUpMap'

export default function MapPage() {
  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      ></Script>
      <main className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden">
        <NearbyPopUpMap />
      </main>
    </>
  )
}
