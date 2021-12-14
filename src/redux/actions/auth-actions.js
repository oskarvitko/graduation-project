import AuthService from '../../services/AuthService'
import {
    SET_AUTH,
    SET_USER,
    SET_LOADING,
    SET_TOKEN_EXPIRED,
    SET_STORAGE,
    SET_USERS
} from '../types/auth-types'
import api, { delay } from '../../http'

export const setStorage = (storage) => ({ type: SET_STORAGE, payload: storage })

export const setTokenExpired = (expired) => ({ type: SET_TOKEN_EXPIRED, payload: expired })

export const setAuth = (auth) => ({ type: SET_AUTH, payload: auth })

export const setUsers = (users) => ({ type: SET_USERS, payload: users })

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
})

export const setUser = (user) => ({ type: SET_USER, payload: user })

export const login = (login, password) => async (dispatch, getState) => {
    dispatch(setLoading(true))
    await delay(1000)
    try {
        // const response = await AuthService.login(login, password)
        // if (response.status === 200) {
        //     const { storage } = getState().auth
        //     dispatch(setUser({ username: response.data.username }))
        //     dispatch(setAuth(true))
        //     storage.setItem('token', response.data.access_token)
        //     storage.setItem('username', response.data.username)
        // }
        // return response
        const {
            users,
            storage
        } = getState().auth

        const result = users.find(user => user.login === login)
        if (result && result.password === password) {
            dispatch(setUser({ username: result.username }))
            dispatch(setAuth(true))
            storage.setItem('token', result.access_token)
            storage.setItem('username', result.username)
            return {
                status: 200
            }
        } else {
            return 'Введены некорректные Login или пароль'
        }
    } catch (e) {
        // return e.response
    } finally {
        dispatch(setLoading(false))
    }
}

export const register = (data) => async (dispatch, getState) => {
    dispatch(setLoading(true))
    await delay(1000)
    try {
        const {
            users
        } = getState().auth

        const result = users.find(user => user.login === data.login)
        if (result) {
            return 'Пользователь с таким Login уже существует'
        } else {
            dispatch(setUsers([...users, { ...data, downloaded: 0, access_token: 'sometoken' }]))
            return {
                status: 200
            }
        }
    } catch (e) {
        // return e.response
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

export const logout = () => setAuth(false)
// export const logout = () => async dispatch => {
//     dispatch(setLoading(true))
//     try {
//         dispatch(setAuth(false))
//     } catch (e) {
//         console.log(e)
//     } finally {
//         dispatch(setLoading(false))
//     }
// }

export const auth = () => async dispatch => {
    dispatch(setLoading(true))
    try {
        const response = await api.get('student')
        if (response.status === 200) return response.data[0]
    } catch (e) { } finally {
        dispatch(setLoading(false))
    }
}