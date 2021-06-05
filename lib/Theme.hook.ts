import { useContext } from 'react'
import { ThemeContext } from './Theme.context'
import { ThemeValue } from './Theme.types'

export function useTheme(): ThemeValue {
  const { activeTheme, setActiveTheme } = useContext(ThemeContext)

  const setLightTheme = () => {
    setActiveTheme('light')
  }

  const setDarkTheme = () => {
    setActiveTheme('dark')
  }

  return { activeTheme, setLightTheme, setDarkTheme }
}
