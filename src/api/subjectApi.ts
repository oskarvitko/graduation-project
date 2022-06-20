import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { ISubject } from 'structures/ISubject'

export const subjectApi = createApi({
    reducerPath: 'subjectApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        getSubjectsByTeacherId: build.query<ISubject[], string>({
            query: (id) => ({
                url: '/Subject/getSubjectsByTeacherId',
                method: 'GET',
                params: { teacherId: id },
            }),
        }),
    }),
})

export const { useLazyGetSubjectsByTeacherIdQuery } = subjectApi
