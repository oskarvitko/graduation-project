import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appSlice from './reducers/appReducer'
import userSlice from './reducers/userReducer'

const rootReducer = combineReducers({
    user: userSlice,
    app: appSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
