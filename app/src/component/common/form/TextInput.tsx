import { MouseEvent, useContext } from 'react'

import { useWatch } from 'react-hook-form'
import { FormContext } from '.'

type TextInputProps = {
  name: string
  className?: string
  placeholder?: string
  type?: string
  label?: boolean | string
  hasBtn?: boolean | string
  handleClickBtn?: (value: any) => void
}

export default function TextInput({
  className,
  name,
  placeholder,
  type,
  label,
  hasBtn,
  handleClickBtn = () => {},
}: TextInputProps) {
  const { register, errors, resetField, control } = useContext(FormContext)
  const value = useWatch({ control, name: name })

  const onClickClearButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    resetField(name)
  }

  const onClickBtn = () => {
    handleClickBtn(value)
  }

  return (
    <>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {typeof label === 'string' ? label : name}
        </label>
      )}

      <div className="flex items-center">
        <div className="relative w-full">
          <input
            className={`${
              errors[name] ? 'border-red-500' : ''
            } mt-1 border-1 border-solid focus:border-1 focus:border-gray-400 focus:outline-none ${className}`}
            placeholder={placeholder}
            type={type ?? 'text'}
            {...register(name, {
              valueAsNumber: type === 'number' ? true : false,
            })}
          />
          {value && (
            <button
              type="button"
              className="absolute inset-y-0 right-3 text-sm text-gray-300 hover:text-gray-500"
              onClick={(e) => onClickClearButton(e)}
            >
              ✕
            </button>
          )}
        </div>
        {hasBtn && (
          <button
            type="button"
            className="ml-2 mt-1 h-12 shrink-0 rounded-md bg-primary-500 px-2.5 font-bold text-white hover:bg-primary-400"
            onClick={onClickBtn}
          >
            {typeof hasBtn === 'string' ? hasBtn : '중복 확인'}
          </button>
        )}
      </div>

      {errors[name] && (
        <small role="alert" className="text-sm text-red-500">
          {errors[name].message}
        </small>
      )}
    </>
  )
}
