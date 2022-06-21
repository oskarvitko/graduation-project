import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL, baseApiQuery } from 'api'
import axios from 'axios'
import { downloadProgressType } from 'pages/materials/Details/MaterialDetails'
import { IMaterial } from 'structures/IMaterial'
import { IRating } from 'structures/IRating'

export type BookmarkType = {
    userId: string
    materialId: number
    isBookmark: boolean
    bookmarkName: string
    id?: number
}

type addMaterialsToSubjectType = {
    subjectId: number
    materialIds: number[]
}

export type CreateAndUploadMaterialType = {
    TeacherUserId: string
    MaterialCategoryId: number
    Url?: string
    Name: string
    Course: number
    Description: string
    file?: File
}

export type editMaterialType = {
    materialId: number
    userId: string
    fileId: number
    materialCategoryId: number
    name: string
    course: number
    materialType: string
    description: string
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
        editMaterial: build.mutation<IMaterial, editMaterialType>({
            query: (data) => ({
                url: '/Material/editMaterial',
                method: 'PUT',
                body: data,
            }),
        }),
        deleteMaterialById: build.mutation<string, string>({
            query: (id) => ({
                url: '/Material/deleteMaterialById',
                method: 'DELETE',
                params: { materialId: id },
            }),
            invalidatesTags: ['materials'],
        }),
        addMaterialToSubject: build.mutation<string, addMaterialsToSubjectType>(
            {
                query: (body) => ({
                    url: '/Subject/addMaterialsToSubject',
                    method: 'PUT',
                    body,
                }),
            }
        ),
    }),
})

export async function createAndUploadMaterial(
    data: CreateAndUploadMaterialType,
    updateDownloadProgress: (progress: downloadProgressType) => void
) {
    try {
        const formData = new FormData()
        formData.append('TeacherUserId', data.TeacherUserId)
        formData.append('Course', data.Course.toString())
        formData.append('Description', data.Description)
        formData.append(
            'MaterialCategoryId',
            data.MaterialCategoryId.toString()
        )
        formData.append('Name', data.Name)
        data.file
            ? formData.append('file', data.file)
            : formData.append('Url', data.Url || '')

        const response = await axios.post(
            API_URL + `/api/Material/createAndUploadMaterial`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progress: ProgressEvent) => {
                    updateDownloadProgress({
                        total: 100,
                        current: (progress.loaded * 100) / progress.total,
                        progress: (progress.loaded * 100) / progress.total,
                    })
                },
            }
        )
        if (response.status === 200) {
            return response.data as IMaterial
        }
    } catch (e) {
        console.error('Material Upload error:', e)
    } finally {
        updateDownloadProgress({
            total: 0,
            current: 0,
            progress: 0,
        })
    }
}

export const {
    useLazyGetMaterialsQuery,
    useGetMaterialsQuery,
    useDeleteMaterialByIdMutation,
    useUpdateBookmarkMutation,
    useGetMaterialRatingsQuery,
    useAddMaterialToSubjectMutation,
    useEditMaterialMutation,
    useAddRatingMutation,
} = materialApi
