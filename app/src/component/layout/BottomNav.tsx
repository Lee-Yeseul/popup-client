import Link from 'next/link'
import BottomBox from '@/app/src/component/common/BottomBox'
import Home from '@/public/assets/icons/home.svg'
import Map from '@/public/assets/icons/map.svg'
import Person from '@/public/assets/icons/person.svg'

export default function BottomNav() {
  return (
    <BottomBox>
      <div className="flex h-full w-full items-center justify-around text-gray-500">
        <Link href={'/pop-up/map'}>
          <div className="flex h-full flex-1 flex-col items-center justify-between">
            <Map
              width="25"
              height="25"
              className="m-1 flex h-full items-center"
              fill="black"
            />
            지도
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex h-full flex-1 flex-col items-center justify-between">
            <Home
              width="25"
              height="25"
              className="m-1 flex h-full items-center"
              fill="black"
            />
            홈
          </div>
        </Link>
        <Link href={'/signup'}>
          <div className="flex h-full flex-1 flex-col items-center justify-between">
            <Person
              width="24"
              height="24"
              className="m-1 flex h-full items-center"
              fill="black"
            />
            마이페이지
          </div>
        </Link>
      </div>
    </BottomBox>
  )
}
