import { CompoundItem } from '@/app/type'

interface SubmitButtonProps extends CompoundItem {
  buttonProps?: any
}

export default function SubmitButton({
  className,
  children,
  buttonProps,
}: SubmitButtonProps) {
  return (
    <button type="submit" className={className} {...buttonProps}>
      {children}
    </button>
  )
}
