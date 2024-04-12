import { CompoundItem } from '@/app/type'

export default function SubmitButton({ className, children }: CompoundItem) {
  return (
    <button type="submit" className={className}>
      {children}
    </button>
  )
}
