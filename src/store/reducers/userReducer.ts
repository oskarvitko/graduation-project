import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    auth: boolean
    token: string
}

const initialState: UserState = {
    auth: false,
    token: localStorage.getItem('token') || '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.auth = true
            state.token = action.payload
        },
        logout(state) {
            state.auth = false
            state.token = ''
            localStorage.removeItem('token')
        },
    },
})

export default userSlice.reducer
