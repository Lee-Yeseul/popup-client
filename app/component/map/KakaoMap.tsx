import { ReactNode } from 'react'
import { Map } from 'react-kakao-maps-sdk'

interface MyMapProps {
  lat: number
  lng: number
  children?: ReactNode
}

export default function KakaoMap({ lat, lng, children }: MyMapProps) {
  return (
    <>
      <div className="flex h-full w-full items-center">
        <Map
          center={{ lat: lat, lng: lng }}
          style={{ width: '100%', height: '100%' }}
          level={2}
        >
          {children}
        </Map>
      </div>
    </>
  )
}
