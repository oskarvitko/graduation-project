import { SET_AUTH, SET_LOADING, SET_TOKEN_EXPIRED, SET_USER, SET_STORAGE } from "../types/auth-types"

const initialState = {
    isLoading: false,
    isAuth: false,
    user: {},
    tokenExpired: false,
    storage: null
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: payload }
        case SET_USER:
            return { ...state, user: payload }
        case SET_AUTH:
            return { ...state, isAuth: payload }
        case SET_TOKEN_EXPIRED:
            return {
                ...state,
                tokenExpired: payload,
                isAuth: false
            }
        case SET_STORAGE:
            return {
                ...state,
                storage: payload
            }
        default: return state
    }
}

export default authReducer