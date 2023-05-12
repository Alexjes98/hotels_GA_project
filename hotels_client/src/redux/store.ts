import { configureStore } from '@reduxjs/toolkit'
import appStateSlice from './features/appStateSlice'
import selectedZone from './features/selectedZone'

export const store = configureStore({
    reducer: {
        appState: appStateSlice,
        selectedZone: selectedZone
    }
})

export type RootState = ReturnType<typeof store.getState>