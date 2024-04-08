import HeaderMenu from './HeaderMenu'

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-10 h-16 w-full border-b-[1px] border-solid border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-8">
        <div>로고</div>
        {/* <SearchBar /> */}
        <HeaderMenu />
      </div>
    </header>
  )
}
