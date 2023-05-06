import React, { useState } from 'react'
import { IconButton, Sheet, Input } from '@mui/joy'
import UpIcon from '@heroicons/react/24/solid/ArrowUpIcon'

export default function InputBox (props: {
  onSubmit: (message: string) => void
}) {
  const [messageInput, setMessageInput] = useState<string>('')

  const submit = () => {
    if (messageInput.length === 0) {
      return
    }
    props.onSubmit(messageInput)
    setMessageInput('')
  }
  return (
    <Sheet
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      sx={{
        p: '14px',
        display: 'flex',
        width: '100%',
        background: 'transparent'
      }}
    >
      <Input
        defaultValue={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
        fullWidth
        autoFocus
        id="message-input"
        sx={{
          ['& .MuiInputBase-root']: {
            fontSize: 12,
            borderRadius: '16px',
            backgroundColor: '#00000033',
            backdropFilter: 'blur(40px)'
          },
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault()
            submit()
            setMessageInput('')
            return
          }
        }}
        endDecorator={
          <IconButton type="submit" variant="plain">
            <UpIcon />
          </IconButton>
        }
      />
    </Sheet>
  )
}