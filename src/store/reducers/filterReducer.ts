import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { materialTypes } from '../../constants'

interface FilterState {
    materialName: string
    specialtyId?: string
    teacherUserId?: string
    courses: number[]
    materialType: string[]
}

const initialState: FilterState = {
    materialName: '',
    courses: [],
    materialType: materialTypes,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setMaterialName(state, action: PayloadAction<string>) {
            state.materialName = action.payload
        },
        setCourses(state, action: PayloadAction<number[]>) {
            state.courses = action.payload
        },
        setMaterialType(state, action: PayloadAction<string[]>) {
            state.materialType = action.payload
        },
        setFilter(state, action: PayloadAction<FilterState>) {
            state.courses = action.payload.courses
            state.materialName = action.payload.materialName
            state.materialType = action.payload.materialType
        },
        resetFilter(state) {
            state.courses = initialState.courses
            state.materialName = initialState.materialName
            state.materialType = initialState.materialType
        },
    },
})

export default filterSlice.reducer
