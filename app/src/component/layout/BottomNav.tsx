'use client'

import Link from 'next/link'
import Home from '@/public/assets/icons/home.svg'
import Map from '@/public/assets/icons/map.svg'
import Person from '@/public/assets/icons/person.svg'
import BottomBox from '@/app/src/component/common/BottomBox'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <BottomBox>
      <div className="flex h-full w-full items-center justify-around bg-white text-sm">
        <Link href={'/pop-up/map'}>
          <div
            className={`flex h-full flex-1 flex-col items-center justify-between ${pathname === '/pop-up/map' ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <Map
              width="25"
              height="25"
              className="m-1"
              fill={pathname === '/pop-up/map' ? '#1d1b78' : '#6b7280'}
            />
            지도
          </div>
        </Link>
        <Link href={'/'}>
          <div
            className={`flex h-full flex-1 flex-col items-center justify-between ${pathname === '/pop-up' ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <Home
              width="25"
              height="25"
              className="m-1"
              fill={pathname === '/pop-up' ? '#1d1b78' : '#6b7280'}
            />
            홈
          </div>
        </Link>
        <Link href={'/my-page'}>
          <div
            className={`flex h-full flex-1 flex-col items-center justify-between ${pathname === '/my-page' ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <Person
              width="22"
              height="22"
              className="m-1"
              fill={pathname === '/my-page' ? '#1d1b78' : '#6b7280'}
            />
            마이페이지
          </div>
        </Link>
      </div>
    </BottomBox>
  )
}
