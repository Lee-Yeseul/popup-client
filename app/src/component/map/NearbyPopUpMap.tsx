'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import Spinner from '@/app/src/component/common/Spinner'
import useToast from '@/app/src/component/common/toast/useToast'
import { popUpAPI } from '@/app/src/api/pop-up'
import { PopUpLocationInfo } from '@/app/src/type/pop-up'

export default function NearByPopUpMap() {
  const { toast } = useToast()
  const [isLoaded, setIsLoaded] = useState(false)
  const [lat, setLat] = useState(33.5563)
  const [lng, setLng] = useState(126.79581)
  const [positions, setPositions] = useState<PopUpLocationInfo[]>([])

  const getMapList = async () => {
    try {
      const response = await popUpAPI.getPopUpMapList()
      const { data } = response
      return data
    } catch (err) {
      toast('팝업 정보를 불러오는데 실패했습니다.', 'error')
    }
  }

  const success: PositionCallback = async ({ coords }) => {
    const { latitude, longitude } = coords

    setLat(latitude)
    setLng(longitude)
    setIsLoaded(true)

    const mapList = await getMapList()
    if (!mapList) return
    setPositions(mapList)
  }
  const error: PositionErrorCallback = async (err) => {
    toast('현재 위치를 찾을 수 없습니다.', 'error')
    console.log(err)

    const mapList = await getMapList()
    if (!mapList) return
    setPositions(mapList)
    setIsLoaded(true)
  }

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 2000,
        enableHighAccuracy: false,
      })
    } else {
      alert('no geolocation support')
    }
  }

  useEffect(() => {
    const $body = document.querySelector('body')
    if (!$body) return
    const { overflow } = $body.style
    $body.style.overflow = 'hidden'

    return () => {
      $body.style.overflow = overflow
    }
  }, [])

  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="lazyOnload"
        onLoad={() => initMap()}
      />
      <div className="flex h-full w-full justify-items-center">
        {isLoaded ? (
          <Map
            center={{
              lat: lat,
              lng: lng,
            }}
            style={{ width: '100%', height: '100%' }}
            level={2}
          >
            {positions.map(({ latitude, longitude, title }) => (
              <div key={`${title}_${latitude}_${longitude}`}>
                <MapMarker
                  position={{
                    lat: latitude,
                    lng: longitude,
                  }}
                />
                <CustomOverlayMap
                  position={{ lat: latitude, lng: longitude }}
                  yAnchor={2}
                >
                  <div className="mb-1 rounded-lg bg-primary-500 p-2 text-white">
                    <span>{title}</span>
                  </div>
                </CustomOverlayMap>
              </div>
            ))}
          </Map>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )
}
