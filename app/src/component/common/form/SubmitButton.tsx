import { CompoundItem } from '@/app/src/type'
import { FormEvent, useContext } from 'react'
import { FormContext } from '.'

interface SubmitButtonProps extends CompoundItem {
  buttonProps?: any
  type?: 'submit' | 'button'
}

export default function SubmitButton({
  className,
  children,
  buttonProps,
  type,
}: SubmitButtonProps) {
  const { handleSubmit, onSumbit } = useContext(FormContext)
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(onSumbit)()
  }

  return (
    <button
      type={type ?? 'submit'}
      onClick={handleFormSubmit}
      className={className}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
