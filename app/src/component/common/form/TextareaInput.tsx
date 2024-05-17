import { useContext } from 'react'
import { useWatch } from 'react-hook-form'
import { FormContext } from '.'

type TextareaInputProps = {
  className: string
  name: string
  placeholder: string
  type?: string
  label?: boolean | string
}

export default function TextareaInput({
  className,
  name,
  placeholder,
  label,
}: TextareaInputProps) {
  const { register, errors, resetField, control } = useContext(FormContext)
  const value = useWatch({ control, name: name })
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {typeof label === 'string' ? label : name}
        </label>
      )}
      <div className="relative">
        <textarea
          className={`${
            errors[name] ? 'border-red-500' : ''
          } mt-1 resize-none border-1 border-solid focus:border-1 focus:border-gray-400 focus:outline-none ${className} `}
          placeholder={placeholder}
          {...register(name)}
          rows={10}
        ></textarea>
        {value && (
          <button
            type="button"
            className="absolute bottom-3 right-3 text-sm text-gray-300 hover:text-gray-500"
            onClick={() => resetField(name)}
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
    </div>
  )
}
