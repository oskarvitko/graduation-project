import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { userSlice } from 'store/reducers/userReducer'

export const API_URL = process.env.REACT_APP_API_URL

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL + '/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token')

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
})

export const baseApiQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        api.dispatch(userSlice.actions.logout())
    }

    return result
}
