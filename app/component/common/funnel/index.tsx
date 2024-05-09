import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react'
import { CompoundItem } from '@/app/type'
import FunnelStep, { FunnelStepProps } from './FunnelStep'

type FunnelProps = CompoundItem & {
  children: Array<ReactElement<FunnelStepProps>>
}

type FunnelContextValue = {
  totalStep: number
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export const FunnelContext = createContext<FunnelContextValue>({
  totalStep: 0,
  currentStep: 0,
  setCurrentStep: () => {},
})

export default function Funnel({ children }: FunnelProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const providerValue = {
    totalStep: children.length,
    currentStep,
    setCurrentStep,
  }

  const view = children.find((child) => child.props.step === currentStep)

  return (
    <FunnelContext.Provider value={providerValue}>
      {view}
    </FunnelContext.Provider>
  )
}

Funnel.Step = FunnelStep
