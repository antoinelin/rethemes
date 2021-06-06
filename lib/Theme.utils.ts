import { Theme } from './Theme.types'

export const isBrowser = typeof window !== 'undefined'

export function containsStandardThemes(themes: string[]): themes is Theme[] {
  return themes.includes('light') && themes.includes('dark')
}

export function isTheme<T extends string>(themes: T[], tested: string): tested is T {
  return themes.some(theme => theme === tested)
}

export function addDefaultThemeToThemes<T>(themes: T[], defaultTheme: T): T[] {
  if (themes.includes(defaultTheme)) {
    return themes
  }

  return [...themes, defaultTheme]
}

export function setLocalSettingWithTTL<T>(theme: T, ttl = 0) {
  const now = new Date()

  localStorage.setItem(
    'theme',
    JSON.stringify({
      value: theme,
      expire: now.getTime() + ttl,
    })
  )
}

export function getLocalSettingWithTTL<T>(): T | null {
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

export function getInitialTheme<T extends string>(themes: T[], defaultTheme: T): T {
  if (!isBrowser) {
    return defaultTheme
  }

  const localSetting = getLocalSettingWithTTL<T>()

  if (localSetting && isTheme<T>(themes, localSetting)) {
    return localSetting
  }

  if (containsStandardThemes(themes)) {
    const browserSetting =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    if (isTheme<T>(themes, browserSetting)) {
      return browserSetting
    }
  }

  return defaultTheme
}

export function setBodyClassList<T extends string>(themes: T[], theme: T): void {
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
