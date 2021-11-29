import AuthService from '../../services/AuthService'
import {
    SET_AUTH,
    SET_USER,
    SET_LOADING,
    SET_TOKEN_EXPIRED,
    SET_STORAGE
} from '../types/auth-types'
import api from '../../http'

export const setStorage = (storage) => ({ type: SET_STORAGE, payload: storage })

export const setTokenExpired = (expired) => ({ type: SET_TOKEN_EXPIRED, payload: expired })

export const setAuth = (auth) => ({ type: SET_AUTH, payload: auth })

export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading })

export const setUser = (user) => ({ type: SET_USER, payload: user })

export const login = (login, password) => async (dispatch, getState) => {
    dispatch(setLoading(true))
    try {
        const response = await AuthService.login(login, password)
        if (response.status === 200) {
            const { storage } = getState().auth
            dispatch(setUser({ username: response.data.username }))
            dispatch(setAuth(true))
            storage.setItem('token', response.data.access_token)
            storage.setItem('username', response.data.username)
        }
        return response
    } catch (e) {
        return e.response
    } finally {
        dispatch(setLoading(false))
    }
}

export const registerStudent = ({ login, password, username }) => async dispatch => {
    dispatch(setLoading(true))
    try {
        const response = await AuthService.registerStudent(login, password, username)
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setLoading(false))
    }
}

export const logout = () => async dispatch => {
    dispatch(setLoading(true))
    try {

    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setLoading(false))
    }
}

export const auth = () => async dispatch => {
    dispatch(setLoading(true))
    try {
        const response = await api.get('student')
        if (response.status === 200) return response.data[0]
    } catch (e) { } finally {
        dispatch(setLoading(false))
    }
}