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
  return (
    <>
      <input
        type="date"
        className={`rounded-md border-1 border-solid border-gray-300 p-2 focus:border-1 focus:border-gray-400 focus:outline-none ${className}`}
      />
    </>
  )
}
