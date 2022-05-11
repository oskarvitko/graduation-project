import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    auth: boolean
    role: string | null
    email: string | null
}

const initialState: UserState = {
    auth: false,
    role: null,
    email: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.auth = true
            state.email = action.payload.email
            state.role = action.payload.role
        },
        logout(state) {
            state.auth = false
            state.email = null
            state.role = null
            localStorage.removeItem('token')
        },
    },
})

export default userSlice.reducer
