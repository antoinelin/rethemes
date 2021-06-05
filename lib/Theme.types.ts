export type Theme = 'light' | 'dark'

export interface Props<T> {
  themes?: T[]
  defaultTheme?: Theme | T
  disableAutoDetection?: boolean
}

export interface ContextValue<T> {
  activeTheme: Theme | T
  setActiveTheme: (theme: Theme | T) => void
}

export interface ThemeValue<T> {
  activeTheme: Theme | T
  setActiveTheme: (theme: Theme | T) => void
  themes: {
    key: string
    onClick: () => void
  }[]
}
