import React, { useEffect } from 'react'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'

import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import store, { fetchSettings } from './store'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Conversation from './components/Conversation'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { BusProvider } from './contexts'
import { AppThemeProvider } from './themes'
import { selectColorMode } from './store'

function Layout () {
  console.log('App.tsx////////////////////////////////////////////////////')
  const dispatch = useAppDispatch(),
    colorMode = useAppSelector(selectColorMode)

  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  return (
    <Grid container
      spacing={0} sx={{
        height: '100%',
      }}>
      <Sheet component="div" data-tauri-drag-region
        className="navbar"
        sx={{
          height: '100%',
          padding: '10px 0',
          width: 80,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}>
        <Navbar />
      </Sheet>
      <Sheet component="div" data-tauri-drag-region
        className="sidebar"
        sx={{
          height: '100%',
          padding: '10px 0',
          width: 240,
          maxWidth: {
            lg: 300,
            md: 300,
            sm: 300,
          },
          borderRight: '1px solid',
          borderColor: 'divider',
        }}>
        <Sidebar />
      </Sheet>
      <Sheet component="div"
        className="main"
        sx={{
          flexGrow: 1,
          height: '100%',
        }}>
        <Conversation />
      </Sheet>
      <Toaster theme={colorMode === 'dark' ? 'dark' : 'light'} position="top-center"
        duration={60000}
        toastOptions={{
          style: {
            background: 'var(--joy-palette-primary-softBg, #00000088)',
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'divider',
            padding: '12px 16px',
          },
          className: 'toast',
          descriptionClassName: 'toast-description'
        }} />
    </Grid>
  )
}

export default function App() {

  return (
    <Provider store={store}>
      <BusProvider>
        <AppThemeProvider>
          <Layout />
        </AppThemeProvider>
      </BusProvider>
    </Provider>
  )
}
