import {
  Dispatch,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react'
import useOutsideClick from '@/app/hook/useOutsideClick'
import { CompoundItem } from '@/app/type'
import DropDownList from './DropdownList'
import DropDownItem from './DropDownItem'
import DropdownButton from './DropDownButton'

type Dropdown = CompoundItem

type DropdownContextValue = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  setIsOpen: () => {},
})

export default function Dropdown({ children, className }: Dropdown) {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const onClickOutside = () => {
    setIsOpen(false)
  }

  const providerValue = {
    isOpen,
    setIsOpen,
  }

  useOutsideClick(dropdownRef, onClickOutside)

  return (
    <DropdownContext.Provider value={providerValue}>
      <div ref={dropdownRef} className={className}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

Dropdown.List = DropDownList
Dropdown.Item = DropDownItem
Dropdown.Button = DropdownButton
