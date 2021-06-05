export type Theme = 'light' | 'dark'

export interface Props {
  defaultTheme: Theme
}

export interface ThemeContext {
  activeTheme: Theme
  setActiveTheme: (theme: Theme) => void
}

export interface ThemeValue {
  activeTheme: Theme
  setLightTheme: () => void
  setDarkTheme: () => void
}
