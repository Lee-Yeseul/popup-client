'use client'

import { useState } from 'react'
import Script from 'next/script'
import KakaoMap from '@/app/src/component/map/KakaoMap'
import Spinner from '../common/Spinner'
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

export default function PopUpDetailMap() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        onLoad={() => setIsLoading(false)}
        strategy="lazyOnload"
      ></Script>
      <div className="h-40 w-full">
        {isLoading ? (
          <Spinner />
        ) : (
          <KakaoMap lat={33.5563} lng={126.79581}>
            <MapMarker
              position={{
                lat: 33.5563,
                lng: 126.79581,
              }}
            />
            <CustomOverlayMap
              position={{ lat: 33.5563, lng: 126.79581 }}
              yAnchor={2}
            >
              <div className="mb-1 rounded-lg bg-white p-2">
                <span className="font-semibold">구의야구공원</span>
              </div>
            </CustomOverlayMap>
          </KakaoMap>
        )}
      </div>
    </>
  )
}
