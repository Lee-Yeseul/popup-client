'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import ArrowOutward from '@/public/assets/icons/arrowOutward.svg'
import { PopUpDetail } from '@/app/src/type/pop-up'

interface PopUpDetailMapProps {
  popUpDetail: PopUpDetail
}
export default function PopUpDetailMap({ popUpDetail }: PopUpDetailMapProps) {
  const mapRef = useRef(null)
  const { fullAddress, title, latitude: lat, longitude: lng } = popUpDetail

  return (
    <>
      <div className="flex h-56 w-full flex-col justify-items-center">
        <div className="my-2 text-xl font-bold">팝업 장소</div>
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
            <Link href={`https://map.kakao.com/link/search/${fullAddress}`}>
              <div className="mb-1 flex items-center gap-2 rounded-lg bg-primary-500 p-2 text-white">
                {title}
                <ArrowOutward width="21" height="21" fill="#fff" />
              </div>
            </Link>
          </CustomOverlayMap>
        </Map>
      </div>
    </>
  )
}
