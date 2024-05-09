import { useContext } from 'react'
import { FunnelContext } from '.'

export const useFunnel = () => {
  const { totalStep, currentStep, setCurrentStep } = useContext(FunnelContext)

  const goPrevStep = () => {
    if (currentStep === 0) return
    setCurrentStep((prev) => prev - 1)
  }

  const goNextStep = () => {
    if (currentStep === totalStep - 1) return
    setCurrentStep((prev) => prev + 1)
  }

  return { goPrevStep, goNextStep }
}
