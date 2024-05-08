import { ReactNode, useContext } from 'react'
import { FormContext } from '.'

interface CustomInputProps {
  children: ReactNode
  name: string
  inputProps: any
}
export default function CustomInput({
  children,
  name,
  inputProps,
}: CustomInputProps) {
  const { register, errors, resetField, control } = useContext(FormContext)

  return (
    <>
      {children}
      <input {...register(name)} {...inputProps} />
    </>
  )
}
