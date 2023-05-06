import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session } from '../types'
import { RootState } from '.'
import { useAppSelector } from './hooks'

interface UserState {
  activeSession: Session | null,
}

const initialState: UserState = {
  activeSession: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveSession: (state, action: PayloadAction<Session>) => {
      console.log('setActiveSession', action.payload)
      state.activeSession = action.payload
    },
  }
})

export const { setActiveSession } = userSlice.actions

export const selectUser = (state: RootState) => state.user
export const useUser = () => useAppSelector(selectUser)

export default userSlice.reducer