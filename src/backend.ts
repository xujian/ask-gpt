import { Settings, Session, Message, ColorMode } from './types'
import { v4 as uuidv4 } from 'uuid'
import * as tauri from './tauri'
import { useTranslation } from 'react-i18next'
import { setActiveSession, useSettings } from './store'
import { Theme } from './themes'

export async function writeSettings(settings: Settings) {
  return tauri.write('settings', settings)
}

export async function createSession(name: string = 'New chat'): Promise<Session> {
  const session = {
    id: uuidv4(),
    name: name,
    model: 'gpt-3.5-turbo',
  },
  sessions = await readSessions()
  await writeSessions([...sessions, session])
  return session
}

export async function readSessions(): Promise<Session[]> {
  let sessions: Session[] | undefined = await tauri.read('sessions')
  if (!sessions) {
    sessions = []
  }
  return sessions
}

export const readMessages = async (id: string) => {
  const messages = await tauri.read<Message[]>(`messages-${id}`)
  console.log('read from storage, ', messages)
  return messages || []
}

export const saveMessages = async (id: string, messages: Message[]) => {
  console.log('save storage, ', id, messages)
  return await tauri.write(`messages-${id}`, messages)
}

export const deleteMessages = async (id: string) => {
  return await tauri.remove(`messages-${id}`)
}

export const readSettings = async () => {
  console.log('readSettings......')
  return await tauri.read<Settings>('settings')
}

export const saveSettings = async (value: Settings) => {
  console.log('saveSettings......', value)
  await tauri.write('settings', value)
}

export async function deleteSession(target: Session) {
  let sessions = await readSessions()
  sessions = sessions.filter((s) => s.id !== target.id)
  tauri.write('sessions', sessions)
}

export async function writeSessions(sessions: Session[]) {
  return tauri.write('sessions', sessions)
}
