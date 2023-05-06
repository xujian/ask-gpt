import React, { useEffect, useState } from 'react'
import {
  Sheet,
  Box,
  List,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Button,
} from '@mui/joy'
import ChatIcon from '@heroicons/react/24/solid/ChatBubbleLeftEllipsisIcon'
import { v4 as uuid } from 'uuid'
import * as api from '../api'
import { Session, Message, createMessage, createSession } from '../types'
import MessageItem from './MessageItem'
import InputBox from './InputBox'
import { selectSettings, useSettings, setActiveSession, useUser } from '../store'
import { readMessages, saveMessages } from '../backend'


export default function Conversation () {
  console.log('Conversation.tsx////////////////////////////////////////////////////')
  const {value: settings} = useSettings(),
    user = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [activeMessageId, setActiveMessageId] = useState<String>('')
  const [filled, setFilled] = useState<boolean>(false)

  useEffect(() => {
    setFilled(false)
    if (user.activeSession) {
      console.log('XXXXXXXXXXXXXXXXread messages', user.activeSession)
      readMessages(user.activeSession.id).then((messages) => {
        console.log('XXXXXXXXXXXXXXXXread messages----:::', messages)
        setMessages(messages)
        setTimeout(() => {
          setFilled(true)
        })
      })
    }
  }, [user.activeSession])

  const pushMessage = (content: string) => {
    setMessages(prev => [...prev, {
      role: 'user',
      content,
      id: uuid()
    }])
    api.post({message: content, settings}).then(async (reply) => {
      setMessages(prev => [...prev, reply]) // must use the function form (CharGPT's answer)
    })
  }

  useEffect(() => {
    if (!filled) return
    console.log('messages effect', messages)
    if (user.activeSession) {
      saveMessages(user.activeSession.id, messages)
    }
  }, [messages])
  
  const [menuAnchor, setMenuAnchor] = useState<Element | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const menuItems = [
    {
      label: 'Retry',
      onClick: () => {
        setMenuOpen(false)
      }
    },
    {
      label: 'Delete',
      onClick: () => {
        // delete a message from session
        const newMessages = messages.filter(m => m.id !== activeMessageId)
        setMessages(newMessages)
        if (user.activeSession) {
          saveMessages(user.activeSession.id, newMessages)
        }
        setMenuOpen(false)
      }
    },
    {
      label: 'Copy',
      onClick: () => {
        setMenuOpen(false)
      }
    }
  ]

  const MessageList = () => user.activeSession && (
    <List
      id="message-list"
      className="scroll"
      sx={{
        position: 'absolute',
        pt: 6,
        pb: 11,
        top:0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        '& ul': { padding: 0 },
        '& .message-actions-button': {
          display: 'none',
        },
        '& .message-item:hover .message-actions-button': {
          display: 'block',
        }
      }}>
      {messages.map((message, ix) => (
        <MessageItem
          id={`message-${ix}`}
          key={`message-${message.id}-${ix}`}
          message={message}
          modelName={user.activeSession?.model || settings.model}
          onMenuCall={onMessageMenu}
        />
      ))}
    </List>
  )

  const EmptyNote = () => (
    <Stack className="empty-note" direction="column"
      justifyContent="center"
      alignItems="center"
      spacing="1em"
      sx={{
        height: '100%'
      }}>
      <Typography>
        Select a chat session, Or start a new chat</Typography>
      <Button size="sm" variant="soft">New chat</Button>
    </Stack>
  )

  const onMessageMenu = (id: string) => {
    setActiveMessageId(id)
    const element = document.querySelector(`#message-actions-button-${id}`)
    console.log('---', element)
    if (element) {
      setMenuAnchor(element)
    }
    setMenuOpen(true)
  }

  return (
    <Box
      sx={{
        height: '100%',
        padding: '0',
        position: 'relative',
        backgroundImage: 'url(/static/grain.png)',
      }}
    >
      <Sheet data-tauri-drag-region sx={{
          position: 'absolute',
          display: 'flex',
          padding: '8px 16px',
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(40px)',
          color: '#999',
          zIndex: 100,
          right: '6px',
          left: 0,
        }}>
        { user.activeSession &&
          <>
            <IconButton variant="plain" size="sm" sx={{
              marginRight: '8px'
            }}>
              <ChatIcon />
            </IconButton>
            <Typography
              component="div"
              data-tauri-drag-region
              sx={{
                flexGrow: 1,
                fontSize: 14,
              }}
            >
              {user.activeSession?.name}
            </Typography>
            <Button variant="soft" size="sm">CLear</Button>
          </>
      }
      </Sheet>
      { user.activeSession
        ? <MessageList />
        : <EmptyNote /> 
      }
      <Box 
        sx={{
          position:'absolute',
          bottom:0,
          width: '100%',
        }}>
        <InputBox
          onSubmit={(message) => pushMessage(message)}
        />
      </Box>
      <Menu
        size="sm"
        className="message-menu"
        anchorEl={menuAnchor}
        placement="right-start"
        keepMounted
        open={menuOpen}
        onClose={() => { setMenuOpen(false); setMenuAnchor(null); }}
        sx={{
          minWidth: '160px',
        }}>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.label}
            onClick={() => menuItem.onClick()}>
            {menuItem.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
