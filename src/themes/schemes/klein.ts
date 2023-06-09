import { CssVarsThemeOptions } from '@mui/joy/styles'

const colors = '#002fa7,#002a96,#002686,#002175,#001c64,#001854,#001343,#000e32,#000921,#000511'.split(','),
  indexes = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  shades: Record<string, string> = {}
indexes.forEach((k, i) => {
  shades[k] = colors[i]
})

const theme: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          ...shades,
          solidBg: '#0078D4',
          solidHoverBg: '#106EBE',
          solidActiveBg: '#005A9E',
          solidDisabledBg: '#F3F2F1',
          solidDisabledColor: '#A19F9D',
        },
        background: {
          surface: colors[8]
        }
      },
    },
    light: {
      palette: {
        primary: {
          ...shades,
          solidBg: '#999',
          solidHoverBg: '#106EBE',
          solidActiveBg: '#005A9E',
          solidDisabledBg: '#F3F2F1',
          solidDisabledColor: '#A19F9D',
        },
      },
    },
  },
}

export default theme
