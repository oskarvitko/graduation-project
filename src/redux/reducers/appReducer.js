import { SET_AUTH } from "../actionTypes"

const initialState = {
    auth: false
}

const appReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_AUTH:
            return { ...state, auth: payload }
        default:
            return state
    }
}

export default appReducer