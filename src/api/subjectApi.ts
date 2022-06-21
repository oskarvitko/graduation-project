import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { ISubject } from 'structures/ISubject'

type createSubjectType = {
    name: string
    course: number
    userId: string
    specialtyId: number
}

type updateSubjectType = {
    name: string
    course: number
    userId: string
    specialtyId: number
    subjectId: number
}

export const subjectApi = createApi({
    reducerPath: 'subjectApi',
    baseQuery: baseApiQuery,
    tagTypes: ['subjects'],
    endpoints: (build) => ({
        getSubjectsByTeacherId: build.query<ISubject[], string>({
            query: (id) => ({
                url: '/Subject/getSubjectsByTeacherId',
                method: 'GET',
                params: { teacherId: id },
            }),
        }),
        getAllSubjects: build.query<ISubject[], string>({
            query: () => '/Subject/getAllSubjects',
            providesTags: () => ['subjects'],
        }),
        createSubject: build.mutation<ISubject, createSubjectType>({
            query: (body) => ({
                url: '/Subject/createSubject',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['subjects'],
        }),
        updateSubject: build.mutation<ISubject, updateSubjectType>({
            query: (body) => ({
                url: '/Subject/updateSubject',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['subjects'],
        }),
    }),
})

export const {
    useLazyGetSubjectsByTeacherIdQuery,
    useLazyGetAllSubjectsQuery,
    useCreateSubjectMutation,
    useGetAllSubjectsQuery,
    useUpdateSubjectMutation,
} = subjectApi
