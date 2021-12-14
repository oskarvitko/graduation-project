import axios from 'axios'
import { setTokenExpired } from '../redux/actions/auth-actions'

export const API_URL = 'https://universlib.somee.com'

const api = axios.create({
    baseURL: API_URL + '/api/'
})

export const initInterceptors = store => {

    api.interceptors.request.use(config => {
        const { storage } = store.getState().auth
        config.headers.Authorization = `Bearer ${storage.getItem('token')}`
        return config
    })

    api.interceptors.response.use(
        config => config,
        error => {
            // if (error.response.status === 401) {
            //     store.dispatch(setTokenExpired(true))
            //     const { storage } = store.getState().auth
            //     storage.removeItem('token')
            //     storage.removeItem('username')
            // }

            return Promise.reject(error)
        }
    )

}

export const delay = (time = 300) => new Promise(resolve => setTimeout(() => resolve(), time))


export default api