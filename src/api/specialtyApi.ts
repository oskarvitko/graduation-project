import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { ISpecialty } from 'models/ISpecialty'

export const specialtyApi = createApi({
    reducerPath: 'specialtyApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        getAllSpecialties: build.query<ISpecialty[], string>({
            query: () => '/Specialty/getAllSpecialties',
        }),
    }),
})

export const { useLazyGetAllSpecialtiesQuery, useGetAllSpecialtiesQuery } =
    specialtyApi
