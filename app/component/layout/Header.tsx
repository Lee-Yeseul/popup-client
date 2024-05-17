import Link from 'next/link'
import SearchBar from '../common/SearchBar'

export default function Header() {
  return (
    <header className="fixed z-10 h-16 w-[550px] bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <Link href={'/'} className="text-xl font-bold">
          pop-up NOW
        </Link>
        <SearchBar />
      </div>
    </header>
  )
}
