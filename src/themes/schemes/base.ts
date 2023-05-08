import { CssVarsThemeOptions } from '@mui/joy/styles'

const theme: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: '#0078D4',
          solidHoverBg: '#106EBE',
          solidActiveBg: '#005A9E',
          solidDisabledBg: '#F3F2F1',
          solidDisabledColor: '#A19F9D',
        },
        background: {
        }
      },
    },
    light: {
      palette: {
        primary: {
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
