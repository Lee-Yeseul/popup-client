import HeaderMenu from './HeaderMenu'

export default function Header() {
  return (
    <header className="fixed z-10 h-16 w-[550px] border-b-2 border-solid border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <h2 className="text-xl font-bold">Dog Friends</h2>
        {/* <SearchBar /> */}
        <HeaderMenu />
      </div>
    </header>
  )
}
