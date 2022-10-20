import { useState, useEffect, useContext, createContext } from 'react'
import type { ReactNode } from 'react'

export type ITheme = 'light' | 'dark' | 'system'
export type IResolvedTheme = 'light' | 'dark'

export interface IThemeContext {
  theme: ITheme
  setTheme: (theme: ITheme) => void
  resolvedTheme: IResolvedTheme
}

export interface IThemeProviderProps {
  storageKey?: string
  defaultTheme?: ITheme
  enableSystem?: boolean
  enableColorScheme?: boolean
  attribute?: string
  children: ReactNode
}

const themeContext = createContext<IThemeContext | {}>({})
export const useTheme = () => useContext(themeContext) as IThemeContext

export function ThemeProvider({
  storageKey = 'theme',
  defaultTheme = 'system',
  enableSystem = true,
  enableColorScheme = true,
  attribute = 'class',
  children,
}: IThemeProviderProps) {
  // prettier-ignore
  const initialTheme = enableSystem ? defaultTheme : defaultTheme === 'system' ? 'light' : defaultTheme
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [theme, _setTheme] = useState<ITheme>(initialTheme)
  const [resolvedTheme, _setResolvedTheme] = useState<IResolvedTheme>(
    initialTheme === 'system' ? systemTheme : initialTheme
  )

  const updateTheme = (newTheme: ITheme) => {
    const newResolvedTheme = newTheme === 'system' ? systemTheme : newTheme

    _setTheme(newTheme)
    _setResolvedTheme(newResolvedTheme)

    document.documentElement.setAttribute(attribute, newResolvedTheme)

    enableColorScheme &&
      document.documentElement.setAttribute('style', `color-scheme: ${newResolvedTheme};`)
  }

  const setTheme = (newTheme: ITheme) => {
    localStorage.setItem(storageKey, newTheme)
    updateTheme(newTheme)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem(storageKey) as ITheme | null
    updateTheme(localTheme ? localTheme : initialTheme)
  }, [])

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  )
}
