import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    auth: boolean
    role: string | null
    email: string | null
    tokenExpired: boolean
}

const initialState: UserState = {
    auth: false,
    role: null,
    email: null,
    tokenExpired: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.auth = true
            state.email = action.payload.email
            state.role = action.payload.role
            state.tokenExpired = false
        },
        logout(state) {
            state.auth = false
            state.email = null
            state.role = null
            state.tokenExpired = false
        },
    },
})

export default userSlice.reducer
