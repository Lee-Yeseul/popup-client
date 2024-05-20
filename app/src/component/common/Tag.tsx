interface TagProps {
  value: string
  className: string
  removable?: boolean
  onClickRemoveButton?: () => void
}

export default function Tag({
  value,
  className,
  removable = false,
  onClickRemoveButton,
}: TagProps) {
  return (
    <div className={`rounded-lg px-2.5 py-0.5 font-semibold ${className}`}>
      {value}
      {removable && (
        <button
          type="button"
          onClick={onClickRemoveButton}
          className="pl-2 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  )
}
