import { CssVarsThemeOptions } from '@mui/joy/styles'


const colors = [
  '#c6e07d','#acc36c','#92a65b','#7a8a4b','#62703b',
  '#4b562c','#353e1e','#212711','#0e1205','#020201'],
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
        },
        background: {
          surface: '#001024'
        }
      },
    },
    light: {
      palette: {
        primary: {
          ...shades,
        },
      },
    },
  },
}

export default theme