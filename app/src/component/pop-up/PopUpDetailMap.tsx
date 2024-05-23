'use client'

import Script from 'next/script'
import { useRef, useState } from 'react'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import { PopUpDetail } from '@/app/src/type/pop-up'

interface PopUpDetailMapProps {
  popUpDetail: PopUpDetail
}
export default function PopUpDetailMap({ popUpDetail }: PopUpDetailMapProps) {
  const mapRef = useRef(null)
  const { fullAddress, addressDetail } = popUpDetail
  const [isLoaded, setIsLoaded] = useState(false)
  const [lat, setLat] = useState(33.5563)
  const [lng, setLng] = useState(126.79581)

  const initMap = () => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.addressSearch(fullAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setLat(Number(result[0].y))
          setLng(Number(result[0].x))
        }
      })
    })
    setIsLoaded(true)
  }

  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="lazyOnload"
        onLoad={() => {
          initMap()
        }}
      />
      <div className="flex h-56 w-full flex-col justify-items-center">
        <div className="my-2 text-xl font-bold">팝업 장소</div>
        {isLoaded && (
          <Map
            ref={mapRef}
            center={{ lat, lng }}
            style={{ width: '100%', height: '100%' }}
            level={4}
          >
            <MapMarker
              position={{
                lat,
                lng,
              }}
            />
            <CustomOverlayMap position={{ lat, lng }} yAnchor={2}>
              <div className="mb-1 rounded-lg bg-secondary-500 p-2 text-white">
                <span className="font-semibold">{addressDetail}</span>
              </div>
            </CustomOverlayMap>
          </Map>
        )}
      </div>
    </>
  )
}
