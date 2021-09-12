import { SET_AUTH } from "../actionTypes"

export const setAuth = value => ({
    type: SET_AUTH,
    payload: value
})