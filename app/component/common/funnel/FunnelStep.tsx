import { CompoundItem } from '@/app/type'

export type FunnelStepProps = CompoundItem & {
  step: number
}

export default function FunnelStep({ children }: FunnelStepProps) {
  return <>{children}</>
}
