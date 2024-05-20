import Link from 'next/link'
import SearchBar from '../common/SearchBar'

export default function PopUpListHeader() {
  return (
    <>
      <header className="fixed z-10 h-16 w-[550px] bg-white/80">
        <div className="flex h-full items-center justify-between px-4">
          <Link href={'/'} className="text-xl font-bold text-secondary-500">
            pop-up NOW
          </Link>
          <SearchBar />
        </div>
      </header>
    </>
  )
}
