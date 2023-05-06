import React, { useState } from 'react'

import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'

import Sessions from './Sessions'
import { useBus } from '../contexts'

export default function Sidebar () {
  console.log('Sidebar.tsx////////////////////////////////////////////////////')
  const bus = useBus()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const newSession = async () => {
    bus.emit('sessions.create')
  }
  return (
    <Stack
      sx={{
        height: '100%',
      }}
      spacing={1}
    >
      <Typography sx={{padding: '0 16px'}}>Saved chats</Typography>
      <Sessions />
    </Stack>
  )
}