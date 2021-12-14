import { SET_MATERIALS } from "../types/material-type"

export const setMaterials = (materials) => ({
    type: SET_MATERIALS,
    payload: materials
})