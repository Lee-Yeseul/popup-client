import { ReactNode, useContext } from 'react'
import { DropdownContext } from '.'

export default function DropdownButton({ children }: { children: ReactNode }) {
  const { setIsOpen } = useContext(DropdownContext)

  const onClickBtn = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <button
      onClick={() => onClickBtn()}
      className="flex items-center justify-between gap-3 py-1.5 pl-2.5 pr-2"
    >
      {children}
    </button>
  )
}
