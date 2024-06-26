'use client'

import { useEffect, useState } from 'react'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import Spinner from '@/app/src/component/common/Spinner'
import useToast from '@/app/src/component/common/toast/useToast'
import { popUpAPI } from '@/app/src/api/pop-up'
import { PopUpLocationInfo } from '@/app/src/type/pop-up'
import Link from 'next/link'
import SearchBar from '../common/SearchBar'
import { keywordSearch } from '../../util'

export default function NearByPopUpMap() {
  const { toast } = useToast()
  const [isLoaded, setIsLoaded] = useState(false)
  const [lat, setLat] = useState(37.5406846)
  const [lng, setLng] = useState(127.0566319)
  const [keyword, setKeyword] = useState('')

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

  const search = async (keyword: string) => {
    const { centerLat, centerLng } = await keywordSearch(keyword)

    setLat(centerLat)
    setLng(centerLng)
  }

  useEffect(() => {
    const $body = document.querySelector('body')
    if (!$body) return
    const { overflow } = $body.style
    $body.style.overflow = 'hidden'

    initMap()

    return () => {
      $body.style.overflow = overflow
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    search(keyword)
  }, [keyword])

  return (
    <>
      <div className="flex h-full w-full flex-col justify-items-center">
        {isLoaded ? (
          <>
            <div className="relative">
              <div className="absolute left-0 top-4 z-10 w-full">
                <SearchBar setKeyword={(keyword) => setKeyword(keyword)} />
              </div>
            </div>
            <Map
              center={{
                lat,
                lng,
              }}
              style={{ width: '100%', height: '100%' }}
              level={4}
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
                    <Link
                      href={`https://map.kakao.com/link/search/${latitude},${longitude}`}
                    >
                      <div className="mb-1 flex items-center gap-2 rounded-lg bg-primary-500 p-2 text-white">
                        {title}
                      </div>
                    </Link>
                  </CustomOverlayMap>
                </div>
              ))}
            </Map>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  )
}
