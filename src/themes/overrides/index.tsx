import { CssVarsThemeOptions } from '@mui/joy/styles'
import { merge } from 'lodash'
import MuiButtonGroup from './ButtonGroup'
import MuiButton from './Button'
import MuiCard from './Card'
import MuiChip from './Chip'
import MuiContainer from './Container'
import MuiList from './List'
import MuiMenu from './Menu'
import MuiPopover from './Popover'
import MuiPopper from './Popper'
import MuiSwitch from './Switch'
import MuiTypography from './Typography'

export default function componentOverrides (theme: CssVarsThemeOptions) {
  return merge(
    MuiContainer(),
    MuiCard(),
    MuiMenu(),
    MuiButtonGroup(),
    MuiButton(),
    MuiPopover(),
    MuiPopper(),
    MuiList(),
    MuiSwitch(),
    MuiTypography(),
    MuiChip(),
  )
}