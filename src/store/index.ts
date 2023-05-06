import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settings.slice'
import userReducer from './user.slice'
import theme from '../themes/theme.slice'

const rootReducer = combineReducers({
  settings: settingsReducer,
  user: userReducer,
  theme
})

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(settingsListener.middleware),
})

// let lastAction = null;
// export const getLastAction = () => lastAction;

// export const lastActionMiddleware = store => next => action => {
//   lastAction = action;
//   return next(action);
//  }

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
  useSettings,
  selectSettings,
  save,
  fetchSettings
} from './settings.slice'

export {
  useUser,
  selectUser,
  setActiveSession
} from './user.slice'

export {
  fetchTheme,
  selectColorMode,
  changeColorMode,
  changeScheme,
  saveColorMode,
  saveScheme,
  useColorMode,
  useScheme,
} from '../themes/theme.slice'