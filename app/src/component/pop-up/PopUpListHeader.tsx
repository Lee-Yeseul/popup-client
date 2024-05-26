import Link from 'next/link'

export default function PopUpListHeader() {
  return (
    <>
      <header className="fixed z-10 h-16 w-full min-w-[350px] max-w-[550px] bg-white/80">
        <div className="flex h-full items-center justify-between px-4">
          <Link
            href={'/'}
            className="shrink-0 text-2xl font-bold text-secondary-500"
          >
            pop-up NOW
          </Link>
          {/* <SearchBar /> */}
        </div>
      </header>
    </>
  )
}
