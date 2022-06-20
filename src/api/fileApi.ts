import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL, baseApiQuery } from 'api'
import axios from 'axios'
import { downloadProgressType } from 'pages/materials/Details/MaterialDetails'

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: baseApiQuery,
    endpoints: (build) => ({
        getResourceURL: build.query<{ url: string }, string>({
            query: (id) => ({
                url: '/Material/downloadMaterial',
                method: 'GET',
                params: { materialId: id },
            }),
        }),
    }),
})

export const downloadFile = async (
    id: string,
    updateDownloadProgress: (progress: downloadProgressType) => void
) => {
    try {
        const response = await axios.get(
            API_URL + `/api/Material/downloadMaterial?materialId=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                responseType: 'blob',
                onDownloadProgress: (progress: ProgressEvent) => {
                    updateDownloadProgress({
                        total: 100,
                        current: (progress.loaded * 100) / progress.total,
                        progress: (progress.loaded * 100) / progress.total,
                    })
                },
            }
        )

        if (response.status === 200) {
            return response.data
        }
    } catch (e) {
    } finally {
        updateDownloadProgress({
            total: 0,
            current: 0,
            progress: 0,
        })
    }
}

export const { useLazyGetResourceURLQuery } = fileApi
// b4e5d794-dea2-4004-accc-a8e704cbce98
