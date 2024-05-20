'use client'

import { useEffect, useState } from 'react'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import Spinner from '../common/Spinner'
import useToast from '../common/toast/useToast'

export default function NearByPopUpMap() {
  const { toast } = useToast()
  const [isLoaded, setIsLoaded] = useState(false)
  const [lat, setLat] = useState(33.5563)
  const [lng, setLng] = useState(126.79581)

  const success: PositionCallback = ({ coords }) => {
    const { latitude, longitude } = coords

    setLat(latitude)
    setLng(longitude)
    setIsLoaded(true)
  }
  const error: PositionErrorCallback = (err) => {
    console.log(err)
    setIsLoaded(true)
    toast('현재 위치를 찾을 수 없습니다.', 'error')
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
          center={{ lat, lng }}
          style={{ width: '100%', height: '100%' }}
          level={2}
        >
          <MapMarker
            position={{
              lat,
              lng,
            }}
          />
          <CustomOverlayMap position={{ lat, lng }} yAnchor={2}>
            <div className="mb-1 rounded-lg bg-white p-2">
              <span className="font-semibold">구의야구공원</span>
            </div>
          </CustomOverlayMap>
        </Map>
      ) : (
        <Spinner />
      )}
    </div>
  )
}
