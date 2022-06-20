import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMaterial } from 'structures/IMaterial'

export type sortType = 'ASC' | 'DESC'
export type fieldType = 'name' | 'createDate' | 'materialType'
export type getValuesType = (a: IMaterial, b: IMaterial) => [any, any]

interface MaterialSortState {
    field: fieldType
    sort: sortType
    getValues?: getValuesType
}

const initialState: MaterialSortState = {
    field: 'name',
    sort: 'ASC',
}

export const materialSortSlice = createSlice({
    name: 'materialSort',
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<sortType>) {
            state.sort = action.payload
        },
        setField(state, action: PayloadAction<fieldType>) {
            state.field = action.payload
        },
        setGVFuction(state, action: PayloadAction<getValuesType | undefined>) {
            state.getValues = action.payload
        },
        resetSort(state) {
            state.sort = initialState.sort
            state.field = initialState.field
            state.getValues = initialState.getValues
        },
    },
})

export default materialSortSlice.reducer
