import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import theme from './Theme'
import { cityApi } from '@/Services/city'
import { weatherApi } from '@/Services/weather'

const reducers = combineReducers({
  theme,
  [cityApi.reducerPath]: cityApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['theme'],
  blacklist: [cityApi.reducerPath, weatherApi.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, reducers)
const middlewares: any[] = []

if (true) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
  // middlewares.push(logger)
}
middlewares.push(cityApi.middleware)
middlewares.push(weatherApi.middleware)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
})

const persistor = persistStore(store)

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export { store, persistor }
