import { ReactNode, useContext } from 'react'
import { DropdownContext } from '.'

export default function DropDownList({
  className,
  children,
}: {
  className: string
  children: ReactNode
}) {
  const { isOpen } = useContext(DropdownContext)

  return (
    <>
      {isOpen && (
        <ul
          className={`${className} absolute border-1 border-solid border-gray-300 shadow-md`}
        >
          {children}
        </ul>
      )}
    </>
  )
}
