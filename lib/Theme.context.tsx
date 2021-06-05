import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ContextValue, Props, ThemeValue } from './Theme.types'
import {
  defaultThemes,
  getInitialTheme,
  getLocalSettingWithTTL,
  isBrowser,
  setBodyClassList,
  setLocalSettingWithTTL,
} from './Theme.utils'

export function create<T extends string>({
  themes: customThemes,
  defaultTheme,
  disableAutoDetection = false,
}: Props<T>) {
  const themes = customThemes ? [...defaultThemes, ...customThemes] : defaultThemes

  const ThemeContext = createContext<ContextValue<T>>({
    activeTheme: 'light',
    setActiveTheme: () => null,
  })

  const ThemeProvider = ({ children }: WithChildren) => {
    const [activeTheme, setActiveTheme] = useState<typeof themes[number]>(
      getInitialTheme<T>(themes, defaultTheme)
    )

    useEffect(() => {
      setBodyClassList(themes, activeTheme)
      const localSetting = getLocalSettingWithTTL<T>()

      if (!localSetting || activeTheme !== localSetting) {
        setLocalSettingWithTTL(activeTheme)
      }
    }, [activeTheme])

    useEffect(() => {
      const getColorScheme = (event: MediaQueryListEvent) => {
        const newColorScheme = event.matches ? 'dark' : 'light'

        if (!disableAutoDetection) {
          setActiveTheme(newColorScheme)
        }
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

    return (
      <ThemeContext.Provider
        value={useMemo(() => ({ activeTheme, setActiveTheme }), [activeTheme])}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  const useTheme = (): ThemeValue<T> => {
    const { activeTheme, setActiveTheme } = useContext(ThemeContext)

    const themesToMap = useMemo(
      () =>
        themes.map(theme => ({
          key: theme,
          onClick: () => setActiveTheme(theme),
        })),
      []
    )

    return {
      activeTheme,
      setActiveTheme,
      themes: themesToMap,
    }
  }

  ThemeContext.displayName = 'ThemeContext'
  ThemeProvider.displayName = 'ThemeProvider'
  useTheme.displayName = 'useTheme'

  return { ThemeProvider, useTheme }
}
