import React, { useEffect, useRef } from 'react'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemButton from '@mui/joy/ListItemButton'
import IconButton from '@mui/joy/IconButton'
import ChatIcon from '@heroicons/react/24/solid/ChatBubbleLeftRightIcon'
import OptionsIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon'
import { Session } from '../types'
import { useTranslation } from "react-i18next"
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'

export interface Props {
  session: Session
  selected: boolean
  onSelect: (session: Session) => void
  onDelete: (session: Session) => void
  onEdit: (session: Session) => void
}

export default function SessionItem(props: Props) {
  const { t } = useTranslation()
  const { session, selected, onSelect, onDelete, onEdit } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        className="session-item"
        endAction={
          <IconButton variant="plain" size="sm"
            className="session-item-options"
            onClick={handleClick}>
            <OptionsIcon />
          </IconButton>
        }>
        <ListItemButton selected={selected} 
          onClick={() => onSelect(session)}
          variant={selected ? 'soft' : 'plain'}>
          <ListItemDecorator sx={{
            padding: '0 8px',
            '& svg': {
              width: '20px',
              height: '20px'
            }
          }}>
            <ChatIcon />
          </ListItemDecorator>
          {session.name}
        </ListItemButton>
      </ListItem>
      
      <Menu size="sm"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}>
      <MenuItem key={session.id + 'edit'} onClick={() => {
        onEdit(session)
        handleClose()
      }}>
        {t('rename')}
      </MenuItem>
      <MenuItem key={session.id + 'del'} onClick={() => {
        setAnchorEl(null)
        handleClose()
        onDelete(session)
      }}
      >
        {t('delete')}
      </MenuItem>
    </Menu>
  </>
  )
}
