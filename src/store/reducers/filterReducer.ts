import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { materialTypes } from '../../constants'

interface FilterState {
    materialName: string
    specialtyId: string
    teacherUserId?: string
    courses: number[]
    materialType: string[]
    rating: number
    subjects: string
}

const initialState: FilterState = {
    materialName: '',
    courses: [],
    materialType: materialTypes,
    specialtyId: '',
    rating: 0,
    subjects: '',
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
        setSpecialty(state, action: PayloadAction<string>) {
            state.specialtyId = action.payload
        },
        setRating(state, action: PayloadAction<number>) {
            state.rating = action.payload
        },
        setSubjects(state, action: PayloadAction<string>) {
            state.subjects = action.payload
        },
        resetFilter(state) {
            state.courses = initialState.courses
            state.materialName = initialState.materialName
            state.materialType = initialState.materialType
            state.specialtyId = initialState.specialtyId
            state.rating = initialState.rating
            state.subjects = initialState.subjects
        },
    },
})

export default filterSlice.reducer
