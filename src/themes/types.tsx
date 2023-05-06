import { CssVarsThemeOptions } from '@mui/joy/styles'

export type ColorMode = 'dark' | 'light'

export type SchemeBuilder = (mode: ColorMode) => CssVarsThemeOptions

export type Theme = {
  colorMode: ColorMode,
  scheme: string
}