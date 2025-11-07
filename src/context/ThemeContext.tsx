import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const themes = ['midnight', 'daybreak', 'aurora', 'slate', 'sandstone'] as const

type ThemeId = (typeof themes)[number]

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'nova_theme_pref'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') {
      return 'slate'
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null
    return stored && themes.includes(stored) ? stored : 'slate'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(() => {
    const setTheme = (next: ThemeId) => setThemeState(next)
    const cycleTheme = () => {
      const index = themes.indexOf(theme)
      const next = themes[(index + 1) % themes.length]
      setThemeState(next)
    }

    return { theme, setTheme, cycleTheme }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const availableThemes = themes
