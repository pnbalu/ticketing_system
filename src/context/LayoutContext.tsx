import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const layouts = ['classic', 'compact', 'crisp'] as const

type LayoutId = (typeof layouts)[number]

type LayoutContextValue = {
  layout: LayoutId
  setLayout: (layout: LayoutId) => void
}

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined)

const STORAGE_KEY = 'nova_layout_pref'

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutId>(() => {
    if (typeof window === 'undefined') {
      return 'classic'
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as LayoutId | null
    return stored && layouts.includes(stored) ? stored : 'classic'
  })

  const value = useMemo<LayoutContextValue>(() => ({
    layout,
    setLayout: (next) => setLayoutState(next),
  }), [layout])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, layout)
    }
  }, [layout])

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return ctx
}

export const availableLayouts = layouts
