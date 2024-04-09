import Link from 'next/link'

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 z-10 h-16 w-[550px] border-t-2 border-solid border-gray-200 bg-white">
      <div className="flex h-full w-full items-center justify-around">
        {/* 아이콘 추가 */}
        <Link href={'/'}>메뉴</Link>
        <Link href={'/'}>홈</Link>
        <Link href={'/'}>마이페이지</Link>
      </div>
    </div>
  )
}
