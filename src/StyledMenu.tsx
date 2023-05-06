import { Menu, MenuProps } from '@mui/joy'
import React from 'react'
import 'katex/dist/katex.min.css'
import { styled } from '@mui/joy/styles'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    {...props}
  />
))(({ theme }) => ({
}))

export default StyledMenu
