import { Map } from 'react-kakao-maps-sdk'

interface MyMapProps {
  lat: number
  lng: number
}

export default function VillageMap({ lat, lng }: MyMapProps) {
  return (
    <>
      <div className="flex h-full w-full items-center">
        <Map
          center={{ lat: lat, lng: lng }}
          style={{ width: '100%', height: '100%' }}
        ></Map>
      </div>
    </>
  )
}
