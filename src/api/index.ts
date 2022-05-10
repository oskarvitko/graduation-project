import { AppStore } from 'store'
import { appSlice } from 'store/reducers/appReducer'

const { default: axios } = require('axios')

export const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
    baseURL: API_URL + '/api',
})

export const initInterceptors = (store: AppStore) => {
    api.interceptors.request.use((config: any) => {
        return config
    })
    api.interceptors.response.use((config: any) => {
        return config
    })
}

export default api
