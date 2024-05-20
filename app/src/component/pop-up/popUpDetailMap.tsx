'use client'

import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'

export default function PopUpDetailMap() {
  return (
    <>
      <div className="flex h-56 w-full flex-col justify-items-center">
        <div className="my-2 text-xl font-bold">팝업 장소</div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: '100%', height: '100%' }}
          level={2}
        >
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
        </Map>
      </div>
    </>
  )
}
