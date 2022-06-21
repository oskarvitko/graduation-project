import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { IUser } from 'models/IUser'

export type createEmployeeType = {
    role: string
    email: string
    password: string
    userName: string
    specialtyId: string
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseApiQuery,
    tagTypes: ['users'],
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
            providesTags: () => ['users'],
        }),
        getUserById: build.query<IUser, string>({
            query: (userId) => ({
                url: '/User/getUserById',
                method: 'GET',
                params: { userId },
            }),
        }),
        blockUser: build.mutation<string, string>({
            query: (id) => ({
                url: '/User/blockOrArchivedUserByUserId',
                method: 'PUT',
                body: {
                    userId: id,
                    isArchived: false,
                    isBlocked: true,
                },
            }),
            invalidatesTags: ['users'],
        }),
        unblock: build.mutation<string, string>({
            query: (id) => ({
                url: '/User/unblockedUserByUserId',
                method: 'PUT',
                params: { userId: id },
            }),
            invalidatesTags: ['users'],
        }),
        createEmployee: build.mutation<IUser, createEmployeeType>({
            query: (data) => ({
                url: '/User/createUser',
                method: 'POST',
                body: { ...data, isBocked: false, isArchived: false },
            }),
            invalidatesTags: ['users'],
        }),
        deleteUser: build.mutation<string, string>({
            query: (id) => ({
                url: '/User/deleteUser',
                method: 'DELETE',
                params: { userId: id },
            }),
            invalidatesTags: ['users'],
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
    useBlockUserMutation,
    useCreateEmployeeMutation,
    useDeleteUserMutation,
    useUnblockMutation,
} = userApi

export const useGetUserByTokenQuery = () =>
    userApi.useGetUserByTokenQuery(localStorage.getItem('token') || '')
