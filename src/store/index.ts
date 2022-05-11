import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { specialtyApi } from 'api/specialtyApi'
import { userApi } from 'api/userApi'
import appSlice from './reducers/appReducer'
import userSlice from './reducers/userReducer'

const rootReducer = combineReducers({
    user: userSlice,
    app: appSlice,
    [specialtyApi.reducerPath]: specialtyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddlewares) => [
            ...getDefaultMiddlewares(),
            specialtyApi.middleware,
            userApi.middleware,
        ],
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
