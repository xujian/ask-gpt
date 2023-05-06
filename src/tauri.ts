import * as api from '@tauri-apps/api'
import { Store } from 'tauri-plugin-store-api'
import { Message, Session } from './types'

const store = new Store('./config.json')

export const write = async (key: string, value: any) => {
  await store.set(key, value)
  await store.save()
}

export const read = async <T>(key: string): Promise<T> => {
  const value = await store.get(key)
  return value as T
}

export const remove = async <T>(key: string): Promise<T> => {
  const value = await store.delete(key)
  return value as T
}

export const shouldUseDarkColors = async (): Promise<boolean> => {
  const theme = await api.window.appWindow.theme()
  return theme === 'dark'
}

export async function onSystemThemeChange(callback: () => void) {
  return api.window.appWindow.onThemeChanged(callback)
}

export const getVersion = async () => {
  return api.app.getVersion()
}

export const openLink = async (url: string) => {
  return api.shell.open(url)
}
