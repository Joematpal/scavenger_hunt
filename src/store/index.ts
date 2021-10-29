import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../modules/counter/counterSlice'
import scavengerHuntSlice from '@/modules/ScavengerHunt/scavengerHuntSlice'
export function makeStore() {
  return configureStore({
    reducer: { 
      counter: counterReducer,
      scavengerHunt: scavengerHuntSlice
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store