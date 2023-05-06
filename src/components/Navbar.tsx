import React, { useState } from 'react'

import Stack from '@mui/joy/Stack'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import ChatIcon from '@heroicons/react/24/solid/ChatBubbleLeftRightIcon'
import TemplatesIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import SettingsIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon'
import AddIcon from '@heroicons/react/24/solid/PlusCircleIcon'
import InfoIcon from '@heroicons/react/24/solid/InformationCircleIcon'

import icon from '../logo.svg'
import SettingsDialog from '../dialogs/SettingsDialog'
import { useBus } from '../contexts'
import Titlebar from './Titlebar'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import { useColorMode } from '../store'
import { useColorScheme } from '@mui/joy/styles'
import DarkModeIcon from '@heroicons/react/24/solid/MoonIcon'
import LightModeIcon from '@heroicons/react/24/solid/SunIcon'
import { useAppDispatch } from '../store/hooks'
import SchemeSwitch from './SchemeSwitcher'

export default function Sidebar () {
  console.log('Navbar.tsx////////////////////////////////////////////////////')
  const bus = useBus()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { mode, setMode } = useColorScheme()
  const newSession = async () => {
    bus.emit('sessions.create')
  }
  return (
    <Stack data-tauri-drag-region
      direction="column"
      alignItems="center"
      sx={{
        height: '100%',
        width: '80px',
      }}
      spacing={0}
      >
      <Titlebar data-tauri-drag-region />
      <Stack className="logo" direction="column" sx={{
        width: '100%',
        height: '80px',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={icon} style={{
          width: '40px',
          height: '40px',
        }} />
      </Stack>
      <Tabs aria-label="Icon tabs" 
        defaultValue={0}
        orientation="vertical"
        sx={{
          borderRadius: 'lg',
          '& svg': {
            width: '24px',
            height: '24px',
          }
        }}>
        <TabList variant="soft">
          <Tab color="primary" variant="plain">
            <ChatIcon />
          </Tab>
          <Tab color="primary" variant="plain">
            <TemplatesIcon />
          </Tab>
          <Tab color="primary" variant="plain">
            <SettingsIcon />
          </Tab>
        </TabList>
      </Tabs>
      <Box sx={{flexGrow: 1}} data-tauri-drag-region />
      <Stack className="foot-controls" spacing={1}
        sx={{
          alignItems: 'center',
          paddingBottom: '20px',
        }}
        direction="column" data-tauri-drag-region>
        <IconButton variant="plain" size="sm"
          onClick={() => { newSession() }}
          aria-label="fingerprint">
          <AddIcon />
        </IconButton>
        <SchemeSwitch />
        <IconButton size="sm" variant="plain"
          onClick = { (event) => {
            // dispatch(changeColorMode(event.target.checked ? 'dark' : 'light'))
            setMode(mode === 'light' ? 'dark' : 'light')
          }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        <IconButton variant="plain" size="sm" onClick={() => {
          // setNeedCheckUpdate(false)
          // api.openLink('https://github.com/xujian/ask-gpt/releases')
        }}>
          <InfoIcon />
        </IconButton>
      </Stack>
      {
        settingsOpen && 
        <SettingsDialog open={settingsOpen}
          close={() => setSettingsOpen(false)} />
      }
    </Stack>
  )
}