import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMaterial } from 'structures/IMaterial'

interface MaterialsState {
    createMode: boolean
    createDialog: boolean
    editedMaterial?: IMaterial
}

const initialState: MaterialsState = {
    createMode: true,
    createDialog: false,
}

export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        openDialog(state, action: PayloadAction<boolean>) {
            state.createDialog = true
            state.createMode = action.payload
            if (state.createMode) {
                state.editedMaterial = undefined
            }
        },
        setCreateMode(state, action: PayloadAction<boolean>) {
            state.createMode = action.payload
        },
        setCreateDialog(state, action: PayloadAction<boolean>) {
            state.createDialog = action.payload
        },
        setEditedMaterial(state, action: PayloadAction<IMaterial>) {
            state.editedMaterial = action.payload
        },
    },
})

export default materialsSlice.reducer
