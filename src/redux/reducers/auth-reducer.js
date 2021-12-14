import { SET_AUTH, SET_LOADING, SET_TOKEN_EXPIRED, SET_USER, SET_STORAGE, SET_USERS } from "../types/auth-types"

const initialState = {
    isLoading: false,
    isAuth: false,
    user: {},
    tokenExpired: false,
    storage: null,
    users: [
        {
            username: 'Тестовый пользователь',
            password: 'user',
            login: 'user',
            access_token: 'sometoken',
            downloaded: 6,
            surname: 'Фамилия тестового пользователя'
        },
        {
            username: 'Оскар',
            password: '12345',
            login: 'oskarvitko16@gmail.com',
            access_token: 'sometoken',
            downloaded: 0,
            surname: 'Витко'
        }
    ]
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
        case SET_USERS:
            return {
                ...state,
                users: payload
            }
        default: return state
    }
}

export default authReducer