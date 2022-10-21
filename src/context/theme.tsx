import { useState, useEffect, useContext, createContext } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeContext {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: ResolvedTheme
}

export interface ThemeProviderProps {
  storageKey?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  enableColorScheme?: boolean
  attribute?: string
  children: ReactNode
}

const themeContext = createContext<ThemeContext | {}>({})
export const useTheme = () => useContext(themeContext) as ThemeContext

export function ThemeProvider({
  storageKey = 'theme',
  defaultTheme = 'system',
  enableSystem = true,
  enableColorScheme = true,
  attribute = 'class',
  children,
}: ThemeProviderProps) {
  // prettier-ignore
  const initialTheme = enableSystem ? defaultTheme : defaultTheme === 'system' ? 'light' : defaultTheme
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [theme, _setTheme] = useState<Theme>(initialTheme)
  const [resolvedTheme, _setResolvedTheme] = useState<ResolvedTheme>(
    initialTheme === 'system' ? systemTheme : initialTheme
  )

  const updateTheme = (newTheme: Theme) => {
    const newResolvedTheme = newTheme === 'system' ? systemTheme : newTheme

    _setTheme(newTheme)
    _setResolvedTheme(newResolvedTheme)

    document.documentElement.setAttribute(attribute, newResolvedTheme)

    enableColorScheme &&
      document.documentElement.setAttribute('style', `color-scheme: ${newResolvedTheme};`)
  }

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    updateTheme(newTheme)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem(storageKey) as Theme | null
    updateTheme(localTheme ? localTheme : initialTheme)
  }, [])

  return (
    <themeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </themeContext.Provider>
  )
}
