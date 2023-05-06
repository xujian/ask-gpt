import React, { useRef, useState } from 'react'
import IconButton from '@mui/joy/IconButton'
import SwatchIcon from '@heroicons/react/24/solid/SparklesIcon'
import Menu from '@mui/joy/Menu'
import schemes from '../themes/schemes'
import MenuItem from '@mui/joy/MenuItem'
import Stack from '@mui/joy/Stack'
import Box from '@mui/joy/Box'
import { useAppDispatch } from '../store/hooks'
import { saveScheme, useColorMode, useScheme, useUser } from '../store'
import { Typography } from '@mui/joy'

export default function SchemeSwitch () {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const colorMode = useColorMode(),
    scheme = useScheme()
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setMenuOpen(false)
  }
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const onMenuItemClick = (name: string) => {
    console.log('XXXXonMenuItemClick--------', name)
    dispatch(saveScheme(name))
    setMenuOpen(false)
  }

  return (
    <>
      <IconButton
        size="sm"
        id="apps-menu-demo"
        aria-label="Applications"
        aria-controls={menuOpen ? 'apps-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        variant="plain"
        onClick={handleClick}>
        <SwatchIcon />
    </IconButton>
    <Menu
      className="palette-menu"
      placement="bottom-end"
      invertedColors
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleClose}
      aria-labelledby="apps-menu-demo"
      size="sm"
      sx={{
      }}
    >
    {Object.keys(schemes).map((name, i) => {
      const t = schemes[name],
        m = t.colorSchemes?.['dark'],
        palette: Record<string, any> = m?.palette?.primary || {},
        labels: string[] = ['500', '600', '700', '800', '900'],
        colors = labels.map(l => palette?.[l] || '#ccc')
      return (
      <MenuItem orientation="vertical"
        key={`scheme-${name}`}
        selected={name === scheme}
        onClick={() => onMenuItemClick(name)}>
          <Stack direction="row" alignItems="center" spacing={1}
            className="color-chip" sx={{minWidth: 120}}>
            <Typography sx={{minWidth: 80}}>{name}</Typography>
            { colors.map((c, index) => (<Box key={`color-box-${name}-${index}`} sx={{
              width: '12px',
              height: '12px',
              backgroundColor: c,
              borderRadius: 4
            }} />))}
          </Stack>
      </MenuItem>)
      })}
    </Menu>
    </>
  )
}