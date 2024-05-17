import { CompoundItem } from '@/app/src/type'

export type FunnelStepProps = CompoundItem & {
  step: number
}

export default function FunnelStep({ children }: FunnelStepProps) {
  return <>{children}</>
}
