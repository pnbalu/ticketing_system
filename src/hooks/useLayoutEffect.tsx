import { useEffect } from 'react'
import { useLayout } from '../context/LayoutContext'

export function useApplyLayout() {
  const { layout } = useLayout()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-layout', layout)
    }
  }, [layout])
}
