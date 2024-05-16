import Link from 'next/link'
import dynamic from 'next/dynamic'
import SearchBar from '../common/SearchBar'

const DynamicHeaderMenu = dynamic(() => import('./HeaderMenu'), {
  loading: () => <div></div>,
  ssr: false,
})

export default function Header() {
  return (
    <header className="fixed z-10 h-16 w-[550px] border-b-2 border-solid border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <Link href={'/'} className="text-xl font-bold">
          pop-up NOW
        </Link>
        <SearchBar />
        {/* <DynamicHeaderMenu /> */}
      </div>
    </header>
  )
}
