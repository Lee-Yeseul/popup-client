import { useContext } from 'react'
import { FormContext } from '.'

interface DatePickerProps {
  className: string
  name: string
  label?: boolean | string
}

export default function DatePicker({
  className,
  name,
  label,
}: DatePickerProps) {
  const { register } = useContext(FormContext)

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {typeof label === 'string' ? label : name}
        </label>
      )}
      <input
        type="date"
        {...register(name)}
        className={`rounded-md border-1 border-solid border-gray-300 p-2 focus:border-1 focus:border-gray-400 focus:outline-none ${className}`}
      />
    </div>
  )
}
