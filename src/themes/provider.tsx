import React, { useEffect, useMemo, useState } from 'react'
import { CssVarsProvider, CssVarsThemeOptions, Theme } from '@mui/joy/styles'
import GlobalStyles from '@mui/joy/GlobalStyles'
import CssBaseline from '@mui/joy/CssBaseline'
import { extendTheme } from '@mui/joy/styles'
import { fetchTheme, useColorMode, useScheme } from '../store'
import schemes from './schemes'
import { SchemeBuilder } from './types'
import { useAppDispatch } from '../store/hooks'

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
    const s = schemes[scheme]
    const t = extendTheme({
      ...schemes[scheme],
    })
    console.log('theme provider--------useMemo', s, scheme, t)
    return t
  }, [scheme])

  // useEffect(() => {
  //   setMergedTheme(extendTheme({
  //     ...schemes[scheme]
  //   }))
  // }, [scheme])
  

  // const theme = extendTheme({
  //   ...mergedTheme,
  //   fontFamily: {
  //     display: "'Inter', var(--joy-fontFamily-fallback)",
  //     body: "'Inter', var(--joy-fontFamily-fallback)",
  //   }
  // })
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