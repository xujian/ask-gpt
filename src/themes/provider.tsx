import React, { useEffect, useMemo, useState } from 'react'
import { CssVarsProvider, CssVarsThemeOptions, Theme } from '@mui/joy/styles'
import GlobalStyles from '@mui/joy/GlobalStyles'
import CssBaseline from '@mui/joy/CssBaseline'
import { extendTheme } from '@mui/joy/styles'
import { fetchTheme, useColorMode, useScheme } from '../store'
import schemes from './schemes'
import baseScheme from './schemes/base'
import { SchemeBuilder } from './types'
import { useAppDispatch } from '../store/hooks'
import merge from 'lodash/merge'

const AppThemeProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {

  const colorMode = useColorMode(),
    scheme = useScheme(),
    dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTheme())
  }, [])

  // const [mergedTheme, setMergedTheme] = useState<Theme>(defaultTheme)
  const theme = useMemo(() => {
    const activeScheme = schemes[scheme],
      mergedTheme = merge(activeScheme, baseScheme)
    const t = extendTheme({
      ...mergedTheme,
    })
    return t
  }, [scheme])

  return (
    <CssVarsProvider theme={theme}
      defaultMode={colorMode}>
      <GlobalStyles styles={{}} />
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
export default AppThemeProvider