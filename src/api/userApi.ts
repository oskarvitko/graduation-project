import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { IUser } from 'models/IUser'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        login: build.mutation<string, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: `/authenticate/login`,
                method: 'POST',
                body: { email, password },
                responseHandler: (response) => response.text(),
            }),
        }),
        registrateStudent: build.mutation<any, IUser>({
            query: (data) => ({
                url: '/Registration/registrationStudent',
                method: 'POST',
                body: data,
                responseHandler: (response) => response.text(),
            }),
        }),
        getUserByToken: build.query<IUser, string>({
            query: () => '/User/getUserInfo',
        }),
    }),
})

export const {
    useLoginMutation,
    useRegistrateStudentMutation,
    useLazyGetUserByTokenQuery,
} = userApi

export const useGetUserByTokenQuery = () =>
    userApi.useGetUserByTokenQuery(localStorage.getItem('token') || '')
