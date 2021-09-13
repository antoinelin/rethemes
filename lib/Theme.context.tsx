import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ContextValue, Props, Theme, ThemeValue } from './Theme.types'
import {
  addDefaultThemeToThemes,
  containsStandardThemes,
  getInitialTheme,
  getLocalSettingWithTTL,
  setClassList,
  setLocalSettingWithTTL,
} from './Theme.utils'

export function create<T extends string = Theme>(props: Props<T>) {
  const themes: T[] = props?.themes ?? addDefaultThemeToThemes(props.themes, props.defaultTheme)

  const ThemeContext = createContext<ContextValue<T>>({
    activeTheme: props.defaultTheme,
    setActiveTheme: () => null,
  })

  const ThemeProvider = ({ children }: WithChildren) => {
    const [activeTheme, setActiveTheme] = useState(getInitialTheme<T>(themes, props.defaultTheme))

    useEffect(() => {
      setClassList(themes, activeTheme)
      const localSetting = getLocalSettingWithTTL<T>()

      if (!localSetting || activeTheme !== localSetting) {
        setLocalSettingWithTTL(activeTheme, props?.expiryDuration)
      }
    }, [activeTheme])

    useEffect(() => {
      const hasDefaultTheme = containsStandardThemes(themes)
      const prefersDarkColorQuery = '(prefers-color-scheme: dark)'
      const getColorScheme = (event: MediaQueryListEvent) => {
        const newColorScheme = event.matches ? 'dark' : 'light'

        // this function is called only if `themes` contains 'light' and `dark`
        // @ts-expect-error
        setActiveTheme(newColorScheme)
      }

      if (window.matchMedia && hasDefaultTheme) {
        window.matchMedia(prefersDarkColorQuery).addEventListener('change', getColorScheme)
      }

      return () => {
        if (window.matchMedia && hasDefaultTheme) {
          window.matchMedia(prefersDarkColorQuery).removeEventListener('change', getColorScheme)
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
          setActive: () => setActiveTheme(theme),
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
