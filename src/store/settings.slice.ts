import { AnyAction, AsyncThunkAction, createAsyncThunk, createListenerMiddleware, createSlice, Dispatch, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { Settings } from '../types'
import { RootState } from '.'
import { useAppDispatch, useAppSelector } from './hooks'
import { saveSettings, readSettings } from '../backend'

interface SettingsState {
  value: Settings
}

export const defaultSettings: Settings = {
  openaiKey: '',
  apiHost: 'https://api.openai.com',
  model: 'gpt-3.5-turbo',
  maxContextSize: '4000',
  maxTokens: '2048',
  showWordCount: false,
  showTokenCount: false,
  showModelName: false,
  language: 'en',
}

const initialState: SettingsState = {
  value: defaultSettings
}

export const fetchSettings = createAsyncThunk<Settings>(
  'settings/fetch',
  async () => {
    const value = await readSettings()
    return value
  }
)

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Settings>) => {
      console.log('settings------save()', action)
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      console.log('fetchSettings.fulfilled------', action)
      state.value = action.payload
    })
  }
})

export const { save } = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings
export const useSettings = () => useAppSelector(selectSettings)

export default settingsSlice.reducer
