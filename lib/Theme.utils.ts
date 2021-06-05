import { Theme } from './Theme.types'

export const themes = ['dark', 'light']

export function isTheme(tested: string): tested is Theme {
  return themes.some(theme => theme === tested)
}

export const isBrowser = typeof window !== 'undefined'

export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`)
}

export function getInitialTheme(): Theme {
  const localSetting = localStorage.getItem('theme')

  if (localSetting && isTheme(localSetting)) {
    return localSetting
  }

  const browserSetting =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  if (isTheme(browserSetting)) {
    return browserSetting
  }

  return 'light'
}

export function setLightTheme() {
  if (document.body.classList.contains('theme-dark')) {
    document.body.classList.replace('theme-dark', 'theme-light')
  } else {
    document.body.classList.add('theme-light')
  }
}

export function setDarkTheme() {
  if (document.body.classList.contains('theme-light')) {
    document.body.classList.replace('theme-light', 'theme-dark')
  } else {
    document.body.classList.add('theme-dark')
  }
}
