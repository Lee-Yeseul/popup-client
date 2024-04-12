import Link from 'next/link'
import BottomBox from '../common/BottomBox'

export default function BottomNav() {
  return (
    <BottomBox>
      <div className="flex h-full w-full items-center justify-around">
        <Link href={'/'}>메뉴</Link>
        <Link href={'/'}>홈</Link>
        <Link href={'/'}>마이페이지</Link>
      </div>
    </BottomBox>
  )
}
