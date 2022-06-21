import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { categoryApi } from 'api/categoryApi'
import { fileApi } from 'api/fileApi'
import { materialApi } from 'api/materialApi'
import { specialtyApi } from 'api/specialtyApi'
import { subjectApi } from 'api/subjectApi'
import { userApi } from 'api/userApi'
import appSlice from './reducers/appReducer'
import filterSlice from './reducers/filterReducer'
import materialSortReducer from './reducers/materialSortReducer'
import materialsReducer from './reducers/materialsReducer'
import userSlice from './reducers/userReducer'

const rootReducer = combineReducers({
    user: userSlice,
    app: appSlice,
    filter: filterSlice,
    materialSort: materialSortReducer,
    materials: materialsReducer,
    [specialtyApi.reducerPath]: specialtyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [materialApi.reducerPath]: materialApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddlewares) => [
            ...getDefaultMiddlewares(),
            specialtyApi.middleware,
            userApi.middleware,
            categoryApi.middleware,
            materialApi.middleware,
            fileApi.middleware,
            subjectApi.middleware,
        ],
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
