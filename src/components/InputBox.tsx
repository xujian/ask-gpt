import React, { useState } from 'react'
import { IconButton, Sheet, Input, Textarea } from '@mui/joy'
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
      <Textarea
        defaultValue={messageInput}
        variant="outlined"
        onChange={(event) => setMessageInput(event.target.value)}
        placeholder="Input prompt..."
        maxRows={4}
        onKeyDown={(event) => {
          if (event.keyCode === 13 && event.ctrlKey) {
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
        sx={{
          width: '100%',
          ['& .MuiInputBase-root']: {
            fontSize: 12,
            borderRadius: '16px',
            backgroundColor: '#00000033',
            backdropFilter: 'blur(40px)'
          },
          '& .MuiTextarea-endDecorator': {
            marginInlineStart: 0,
            marginInlineEnd: 0,
            marginBlockStart: 0,
            position: 'absolute',
            right: '3px',
            top: '4px',
          },
          '& .MuiIconButton-root': {
            minHeight: '31px'
          }
        }}
      />
    </Sheet>
  )
}