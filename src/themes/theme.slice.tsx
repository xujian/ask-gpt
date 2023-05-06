import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColorMode, Theme } from './types'
import type { RootState } from '../store'
import { useAppSelector } from '../store/hooks'
import * as tauri from '../tauri'

const initialState: Theme = {
  colorMode: 'light',
  scheme: 'klein'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeColorMode: (state, action: PayloadAction<ColorMode>) => {
      console.log('changeColorMode--------', action)
      state.colorMode = action.payload
    },
    changeScheme: (state, action: PayloadAction<string>) => {
      console.log('changeColorMode--------', action)
      state.scheme = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTheme.fulfilled, (state, action) => {
      console.log('fetchTheme.fulfilled++++++++++++++++++++++++++++++++++++++', action)
      state.colorMode = action.payload.colorMode
      state.scheme = action.payload.scheme
    }).addCase(saveColorMode.fulfilled, (state, action) => {
      state.colorMode = action.payload
    }).addCase(saveScheme.fulfilled, (state, action) => {
      state.scheme = action.payload
    })
  }
})

export const fetchTheme = createAsyncThunk<Theme>(
  'theme/fetch',
  async () => {
    const colorMode = await tauri.read<ColorMode>('colorMode'),
      scheme = await tauri.read<string>('scheme')
    return { colorMode, scheme}
  }
)

export const saveColorMode = createAsyncThunk<ColorMode, ColorMode>(
  'theme/saveColorMode',
  async (colorMode: ColorMode) => {
    await tauri.write('colorMode', colorMode)
    return colorMode
  }
)

export const saveScheme = createAsyncThunk<string, string>(
  'theme/saveScheme',
  async (scheme: string) => {
    console.log('saveScheme00000000000000000000000000000000000', scheme)
    await tauri.write('scheme', scheme)
    return scheme
  }
)

export const { changeColorMode, changeScheme } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColorMode = (state: RootState) => state.theme.colorMode
export const useColorMode = () => useAppSelector(selectColorMode)
export const selectScheme = (state: RootState) => state.theme.scheme
export const useScheme = () => useAppSelector(selectScheme)

export default themeSlice.reducer