export type Theme = 'light' | 'dark'

export interface Props<T extends string = Theme> {
  themes: T[]
  defaultTheme: T
  expiryDuration?: number
}

export interface ContextValue<T extends string> {
  activeTheme: T
  setActiveTheme: (theme: T) => void
}

export interface ThemeValue<T extends string> {
  activeTheme: T
  setActiveTheme: (theme: T) => void
  themes: {
    key: T
    setActive: () => void
  }[]
}
