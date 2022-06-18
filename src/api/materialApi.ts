import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { IMaterial } from 'structures/IMaterial'

export const materialApi = createApi({
    reducerPath: 'materialApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        getMaterials: build.query<IMaterial[], string>({
            query: () => '/Material/getMaterials',
        }),
    }),
})

export const { useLazyGetMaterialsQuery } = materialApi
