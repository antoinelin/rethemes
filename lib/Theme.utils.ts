import { Theme } from './Theme.types'

const EXPIRE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export const isBrowser = typeof window !== 'undefined'
export const defaultThemes: Theme[] = ['dark', 'light']

export function isTheme<T extends string>(themes: (Theme | T)[], tested: string): tested is T {
  return themes.some(theme => theme === tested)
}

export function setLocalSettingWithTTL<T>(theme: T | Theme) {
  const now = new Date()

  localStorage.setItem(
    'theme',
    JSON.stringify({
      value: theme,
      expire: now.getTime() + EXPIRE_DURATION,
    })
  )
}

export function getLocalSettingWithTTL<T>(): T | Theme | null {
  const storedThemeString = localStorage.getItem('theme')

  if (!storedThemeString) {
    return null
  }

  const storedTheme = JSON.parse(storedThemeString)
  const now = new Date()

  if (now.getTime() > storedTheme.expire) {
    localStorage.removeItem('theme')
    return null
  }

  return storedTheme.value
}

export function getInitialTheme<T extends string>(
  themes: (Theme | T)[],
  defaultTheme?: Theme | T
): Theme | T {
  if (!isBrowser) {
    return defaultTheme ?? 'light'
  }

  if (defaultTheme) {
    return defaultTheme
  }

  const localSetting = getLocalSettingWithTTL<T>()

  if (localSetting && isTheme<T>(themes, localSetting)) {
    return localSetting
  }

  const browserSetting =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  if (isTheme<T>(themes, browserSetting)) {
    return browserSetting
  }

  return defaultTheme ?? 'light'
}

export function setBodyClassList<T extends string>(themes: (Theme | T)[], theme: Theme | T): void {
  const bodyThemeClassList = themes.find(theme =>
    document.body.classList.contains(`theme-${theme}`)
  )

  if (bodyThemeClassList && bodyThemeClassList === theme) {
    return
  }

  if (bodyThemeClassList === undefined) {
    document.body.classList.add(`theme-${theme}`)
  } else {
    document.body.classList.replace(`theme-${bodyThemeClassList}`, `theme-${theme}`)
  }
}
