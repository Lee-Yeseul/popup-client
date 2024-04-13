import { MouseEvent, useContext } from 'react'

import { useWatch } from 'react-hook-form'
import { FormContext } from '.'

type TextInputProps = {
  className: string
  name: string
  placeholder: string
  type?: string
  label?: boolean | string
}

export default function TextInput({
  className,
  name,
  placeholder,
  type,
  label,
}: TextInputProps) {
  const { register, errors, resetField, control } = useContext(FormContext)
  const value = useWatch({ control, name: name })

  const onClickClearButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    resetField(name)
  }

  return (
    <>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {typeof label === 'string' ? label : name}
        </label>
      )}
      <div className="relative">
        <input
          className={`${
            errors[name] ? 'border-red-500' : ''
          } mt-1 border-1 border-solid focus:border-1 focus:border-gray-400 focus:outline-none ${className}`}
          placeholder={placeholder}
          type={type ?? 'text'}
          {...register(name)}
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
      {errors[name] && (
        <small role="alert" className="text-sm text-red-500">
          {errors[name].message}
        </small>
      )}
    </>
  )
}
