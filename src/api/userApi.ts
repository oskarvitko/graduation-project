import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { IUser } from 'models/IUser'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        login: build.mutation<
            { token: string },
            { email: string; password: string }
        >({
            query: ({ email, password }) => ({
                url: `/authenticate/login`,
                method: 'POST',
                body: { email, password },
            }),
        }),
        registrateStudent: build.mutation<{ token: string }, IUser>({
            query: (data) => ({
                url: '/Registration/registrationStudent',
                method: 'POST',
                body: data,
            }),
        }),
        getUserByToken: build.query<IUser, string>({
            query: () => '/User/getUserInfo',
        }),
        getTeacherByStudentUserId: build.query<IUser[], string>({
            query: (userId) => ({
                url: '/User/getTeachersByStudentUserId',
                method: 'GET',
                params: { userId },
            }),
        }),
        getAllUsers: build.query<IUser[], string>({
            query: () => '/User/getAllUsers',
        }),
        getUserById: build.query<IUser, string>({
            query: (userId) => ({
                url: '/User/getUserById',
                method: 'GET',
                params: { userId },
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegistrateStudentMutation,
    useLazyGetUserByTokenQuery,
    useGetTeacherByStudentUserIdQuery,
    useLazyGetTeacherByStudentUserIdQuery,
    useGetAllUsersQuery,
    useLazyGetUserByIdQuery,
} = userApi

export const useGetUserByTokenQuery = () =>
    userApi.useGetUserByTokenQuery(localStorage.getItem('token') || '')
