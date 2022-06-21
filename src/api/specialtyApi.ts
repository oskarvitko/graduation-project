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
        addMaterialToSpecialties: build.mutation<
            string,
            { materialId: number; specialtyIds: number[] }
        >({
            query: (data) => ({
                url: '/Specialty/addMaterialToSpecialties',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const {
    useLazyGetAllSpecialtiesQuery,
    useGetAllSpecialtiesQuery,
    useAddMaterialToSpecialtiesMutation,
} = specialtyApi
