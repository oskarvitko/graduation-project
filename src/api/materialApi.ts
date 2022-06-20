import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from 'api'
import { IMaterial } from 'structures/IMaterial'
import { IRating } from 'structures/IRating'

export type BookmarkType = {
    userId: string
    materialId: number
    isBookmark: boolean
    bookmarkName: string
    id?: number
}

export const materialApi = createApi({
    tagTypes: ['materials', 'ratings'],
    reducerPath: 'materialApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        getMaterials: build.query<IMaterial[], string>({
            query: () => '/Material/getMaterials',
            providesTags: () => ['materials'],
        }),
        updateBookmark: build.mutation<BookmarkType, BookmarkType>({
            query: (bookmark) => ({
                url: '/Bookmark/updateOrCreateBookmark',
                method: 'POST',
                body: bookmark,
            }),
            invalidatesTags: ['materials'],
        }),
        getMaterialRatings: build.query<IRating[], string>({
            query: (id) => ({
                url: '/MaterialRating/getMaterialRatings',
            }),
            providesTags: () => ['ratings'],
        }),
        addRating: build.mutation<
            IRating[],
            { userRating: number; materialId: number }
        >({
            query: ({ userRating, materialId }) => ({
                url: '/MaterialRating/createMaterialRating',
                method: 'POST',
                body: { userRating, materialId },
            }),
            invalidatesTags: ['materials', 'ratings'],
        }),
    }),
})

export const {
    useLazyGetMaterialsQuery,
    useGetMaterialsQuery,
    useUpdateBookmarkMutation,
    useGetMaterialRatingsQuery,
    useAddRatingMutation,
} = materialApi
