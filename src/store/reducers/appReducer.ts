import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Breadcrumb } from 'components/layout/BreadCrumbs'

interface AppState {
    loadingProgress: number
    breadcrumbs: Breadcrumb[]
}

const initialState: AppState = {
    loadingProgress: 0,
    breadcrumbs: [],
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoadingProgress(state, action) {
            state.loadingProgress = action.payload
        },
        setBreadcrumbs(state, action: PayloadAction<Breadcrumb[]>) {
            state.breadcrumbs = action.payload
        },
        replaceLastBreadcrumb(state, action: PayloadAction<Breadcrumb>) {
            state.breadcrumbs[state.breadcrumbs.length - 1] = action.payload
        },
    },
})

export default appSlice.reducer
