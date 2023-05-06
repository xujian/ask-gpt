import React, { useCallback, useEffect, useMemo, useState } from 'react'
import List from '@mui/joy/List'
import SessionItem from './SessionItem'
import { Session } from '../types'
import { setActiveSession, useUser } from '../store'
import { useAppDispatch } from '../store/hooks'
import { readSessions, createSession, deleteSession as deleteSessionBackend } from '../backend'
import { useBus } from '../contexts'
import RenameDialog from '../dialogs/RenameDialog'
import { toast } from 'sonner'

function Sessions () {
  console.log('Sessions.tsx////////////////////////////////////////////////////')
  const user = useUser(),
    dispatch = useAppDispatch(),
    bus = useBus()
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    readSessions().then((sessions: Session[]) => {
      console.log('Sessions.tsx////////readSessions then////')
      setSessions(sessions)
    })
    const newSession = () => {
      console.log('Sessions.tsx/////////createSession////sessions:', sessions)
      createSession().then(session => {
        setSessions((prev) => [
          session,
          ...prev,
        ])
      })
    }
    console.log('Sessions.tsx/////////bus.on////')
    bus.on('sessions.create', newSession)
    return () => {
      console.log('Sessions.tsx/////////bus.offf////')
      bus.off('sessions.create', newSession)
    }
  }, [])

  const [edittingSession, setEdittingSession] = useState<Session | null>(null)

  const handleSessionSelect = useCallback((session: Session) => {
    dispatch(setActiveSession(session))
  }, [dispatch])

  const editSession = useCallback((session: Session) => {
    setEdittingSession(session)
  }, [])

  const deleteSession = useCallback((session: Session) => {
    toast.success('Message deleted')
    // deleteSessionBackend(session).then(() => {
    //   const newSessions = sessions.filter((s) => s.id !== session.id)
    //   setSessions(newSessions)
    // })
  }, [])

  const MemoMenuItems = useMemo(() => {
    console.log('Sessions.tsx----------MemoMenuItems')
    return sessions.map((session) => (
      <SessionItem
        key={session.id}
        selected={user.activeSession?.id === session.id}
        session={session}
        onSelect={handleSessionSelect}
        onDelete={(session) => {
          deleteSession(session)
        }}
        onEdit={(session) => {
          editSession(session)
        }}
      />
    ))
  }, [sessions, user.activeSession])

  return (
    <>
      <List data-tauri-drag-region
        size="sm"
        className="sessions scroll"
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          flexGrow: 1,
          '& .session-item-options': {
            display: 'none',
          },
          '& .session-item:hover .session-item-options': {
            display: 'block',
          }
        }}>
        {MemoMenuItems}
      </List>
      {
        edittingSession !== null && (
          <RenameDialog open={edittingSession !== null}
            session={edittingSession}
            close={() => setEdittingSession(null)}
          />
        )
      }
    </>
  )
}

export default React.memo(Sessions)