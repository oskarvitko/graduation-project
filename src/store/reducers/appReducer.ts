import { createSlice } from '@reduxjs/toolkit'

interface AppState {
    loadingProgress: number
}

const initialState: AppState = {
    loadingProgress: 0,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoadingProgress(state, action) {
            state.loadingProgress = action.payload
        },
    },
})

export default appSlice.reducer
