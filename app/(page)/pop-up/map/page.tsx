'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

import Spinner from '@/app/component/common/Spinner'
import VillageMap from '@/app/component/map/VillageMap'
import SearchBar from '@/app/component/map/SearchBar'

export default function VlliageListPage() {
  const [isLoading, setIsLoading] = useState(true)
  // localstorage에 넣어서 저장해놓기
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
        <SearchBar />
        {isLoading ? <Spinner /> : <VillageMap lat={lat} lng={lng} />}
      </div>
    </>
  )
}
