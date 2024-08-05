/* eslint-disable import/no-cycle */
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  persistStore,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER
} from 'redux-persist'
import languageReducer from './reducers/language'
import authReducer from './reducers/auth'
import overviewReducer from './reducers/overview'
import appointmentReducer from './reducers/appointment'
import notificationReducer from './reducers/notification'
import earningReducer from './reducers/earning'
import scheduleReducer from './reducers/schedule'
import outletReducer from './reducers/outlet'
import bankReducer from './reducers/bank'
import brandReducer from './reducers/brand'
import copilotReducer from './reducers/copilot'

const asyncPersistConfig = {
  key: 'main',
  storage: AsyncStorage
}

const persistedLangReducer = persistReducer(asyncPersistConfig, languageReducer)
const persistedAuthReducer = persistReducer(asyncPersistConfig, authReducer)
const reducers = combineReducers({
  language: persistedLangReducer,
  auth: persistedAuthReducer,
  overview: overviewReducer,
  appointment: appointmentReducer,
  notification: notificationReducer,
  earning: earningReducer,
  schedule: scheduleReducer,
  outlet: outletReducer,
  bank: bankReducer,
  brand: brandReducer,
  copilot: copilotReducer
})

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})

export const persistor = persistStore(store)
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;