'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

import Spinner from '@/app/src/component/common/Spinner'
import KakaoMap from '@/app/src/component/map/KakaoMap'

export default function VlliageListPage() {
  const [isLoading, setIsLoading] = useState(true)

  const [lat, setLat] = useState(33.5563)
  const [lng, setLng] = useState(126.79581)

  const success: PositionCallback = ({ coords }) => {
    const { latitude, longitude } = coords
    setLat(latitude)
    setLng(longitude)
  }
  const error: PositionErrorCallback = (err) => {
    console.log(err)
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 5000,
        enableHighAccuracy: false,
      })
    } else {
      alert('no geolocation support')
    }
  }, [])
  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        onLoad={() => setIsLoading(false)}
        strategy="lazyOnload"
      ></Script>
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center">
        {isLoading ? <Spinner /> : <KakaoMap lat={lat} lng={lng} />}
      </div>
    </>
  )
}
