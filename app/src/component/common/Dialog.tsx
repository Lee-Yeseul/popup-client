import { CompoundItem } from '@/app/src/type'
import { useEffect, useRef } from 'react'
import Portal from './Potal'
import useOutsideClick from '@/app/src/hook/useOutsideClick'

type DialogProps = CompoundItem & {
  onClickOutside: () => void
}

type CloseButtonProps = CompoundItem & {
  onClose: () => void
}

export default function Dialog({
  children,
  onClickOutside,
  className,
}: DialogProps) {
  const dialogRef = useRef(null)
  useOutsideClick(dialogRef, onClickOutside)

  useEffect(() => {
    const $body = document.querySelector('body')
    if ($body !== null) {
      const { overflow } = $body.style
      $body.style.overflow = 'hidden'
      return () => {
        $body.style.overflow = overflow
      }
    }
  }, [])

  return (
    <Portal>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 w-full bg-black-rgba">
        <div
          ref={dialogRef}
          className="absolute left-1/2 top-1/2 h-fit -translate-x-1/2 -translate-y-1/2 rounded-md border-1 border-solid border-gray-300 bg-white"
        >
          <div className={`${className}`}>{children}</div>
        </div>
      </div>
    </Portal>
  )
}

function Header({ children, className }: CompoundItem) {
  return <div className={className}>{children}</div>
}

function Body({ children, className }: CompoundItem) {
  return <div className={className}>{children}</div>
}

function Footer({ children, className }: CompoundItem) {
  return <div className={className}>{children}</div>
}

function CloseButton({ onClose, className }: CloseButtonProps) {
  return (
    <button
      className={`${className} rounded-full p-2 hover:bg-gray-100`}
      onClick={() => onClose()}
    >
      ✕
    </button>
  )
}

Dialog.Header = Header
Dialog.Body = Body
Dialog.Footer = Footer
Dialog.CloseButton = CloseButton
