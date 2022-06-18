import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { ICategory } from 'structures/ICategory'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        getMaterialCategories: build.query<ICategory[], string>({
            query: () => '/Category/getMaterialCategories',
        }),
    }),
})

export const {
    useGetMaterialCategoriesQuery,
    useLazyGetMaterialCategoriesQuery,
} = categoryApi
