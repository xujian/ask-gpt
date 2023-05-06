import aura from './aura'
import klein from './klein'
import solarized from './solarized'
import balmy from './balmy'
import rose from './rose'
import turquoise from './turquoise'
import camouflage from './camouflage'
import { CssVarsThemeOptions } from '@mui/joy/styles'

/**
 * Color schemes of theme
 * all available in ligth and dark mode
 * 配色方案
 */
const schemes: Record<string, CssVarsThemeOptions> = {
  aura,
  solarized,
  klein,
  balmy,
  rose,
  turquoise,
  camouflage,
}

export default schemes