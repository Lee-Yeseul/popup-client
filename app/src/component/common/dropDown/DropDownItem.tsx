import { useContext } from 'react'
import { DropdownContext } from '.'
import { CompoundItem } from '@/app/src/type'

type DropdownItemProps = CompoundItem & {
  handleClick?: () => void
}
export default function DropDownItem({
  children,
  className,
  handleClick = () => {},
}: DropdownItemProps) {
  const { setIsOpen } = useContext(DropdownContext)
  const onClickBtn = () => {
    handleClick()
    setIsOpen(false)
  }

  return (
    <li className={`px-4 py-3 ${className}`} onClick={onClickBtn}>
      {children}
    </li>
  )
}
