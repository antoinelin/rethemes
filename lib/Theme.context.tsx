import { createContext, useEffect, useState } from 'react'
import { Props, Theme, ThemeContext as Context } from './Theme.types'
import { assertNever, getInitialTheme, isBrowser, setDarkTheme, setLightTheme } from './Theme.utils'

export const ThemeContext = createContext<Context>({
  activeTheme: 'light',
  setActiveTheme: () => null,
})

export function ThemeProvider({ children, defaultTheme }: WithChildren<Props>) {
  const colorScheme = isBrowser ? getInitialTheme() : defaultTheme
  const [activeTheme, setActiveTheme] = useState<Theme>(defaultTheme ?? colorScheme)

  useEffect(() => {
    switch (activeTheme) {
      case 'light': {
        setLightTheme()
        break
      }
      case 'dark': {
        setDarkTheme()
        break
      }
      default: {
        assertNever(activeTheme)
        break
      }
    }

    if (activeTheme !== localStorage.getItem('theme')) {
      localStorage.setItem('theme', activeTheme)
    }

    useEffect(() => {
      const getColorScheme = (event: MediaQueryListEvent) => {
        const newColorScheme = event.matches ? 'dark' : 'light'

        setActiveTheme(newColorScheme)
      }

      if (isBrowser && window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', getColorScheme)
      }

      return () => {
        if (window.matchMedia) {
          window
            .matchMedia('(prefers-color-scheme: dark)')
            .removeEventListener('change', getColorScheme)
        }
      }
    }, [])
  }, [activeTheme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeContext.displayName = 'ThemeContext'
ThemeProvider.displayName = 'ThemeProvider'
