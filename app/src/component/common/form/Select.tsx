import { useContext } from 'react'

import { FormContext } from '.'

type TextInputProps = {
  name: string
  options: { label: string; value: string }[]
  className?: string
  placeholder?: string
  type?: string
  label?: boolean | string
}

export default function Select({
  className,
  name,
  label,
  options,
}: TextInputProps) {
  const { register, errors } = useContext(FormContext)

  return (
    <>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {typeof label === 'string' ? label : name}
        </label>
      )}

      <div className="flex items-center">
        <div className="relative w-full">
          <select {...register(name)} className={className}>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </select>
        </div>
      </div>

      {errors[name] && (
        <small role="alert" className="text-sm text-red-500">
          {errors[name].message}
        </small>
      )}
    </>
  )
}
