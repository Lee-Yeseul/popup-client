'use client'

import { useEffect, useState } from 'react'
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
    console.log(err)
    setIsLoaded(true)

    const mapList = await getMapList()
    if (!mapList) return toast('현재 위치를 찾을 수 없습니다.', 'error')
    setPositions(mapList)
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
    const $body = document.querySelector('body')
    if ($body !== null) {
      const { overflow } = $body.style
      $body.style.overflow = 'hidden'
      return () => {
        $body.style.overflow = overflow
      }
    }
  }, [])

  return (
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
                <div className="mb-1 rounded-lg bg-secondary-500 p-2 text-white">
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
  )
}
