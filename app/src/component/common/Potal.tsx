import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = { children: ReactNode }

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  if (!mounted) return
  return createPortal(<>{children}</>, document.getElementById('root')!)
}
