import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type selectedZone = {
    selectedZoneName: string
}

const initialState: selectedZone = {
    selectedZoneName: ''
}

export const selectedZoneSlice = createSlice({
    name: 'selectedZone',
    initialState,
    reducers: {
        setSelectedZone: (state, action: PayloadAction<string>) => {
            state.selectedZoneName = action.payload
        }
    }
})

export const { setSelectedZone } = selectedZoneSlice.actions

export default selectedZoneSlice.reducer