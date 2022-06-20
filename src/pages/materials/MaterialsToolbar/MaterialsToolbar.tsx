import { Grid, CircularProgress, Divider } from '@mui/material'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { useGetUserByTokenQuery } from 'api/userApi'
import { ROLES } from '../../../constants'
import useRole from 'hook/useRole'
import React, { useEffect } from 'react'
import Search from './Search'
import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
import { useLocation } from 'react-router-dom'
import { filterSlice } from 'store/reducers/filterReducer'
import { useAppDispatch } from 'hook/redux'
import FilterMenu from './FilterMenu'
import SortMenu from './SortMenu'
import { materialSortSlice } from 'store/reducers/materialSortReducer'

type MaterialsToolbatProps = {
    disabled: boolean
    setLoading: (value: boolean) => void
}

const MaterialsToolbar: React.FC<MaterialsToolbatProps> = ({
    setLoading,
    disabled,
}) => {
    const { hasRole } = useRole()
    const { data: user } = useGetUserByTokenQuery()

    const { resetFilter } = filterSlice.actions
    const { resetSort } = materialSortSlice.actions
    const dispatch = useAppDispatch()

    // const { data: teachers, isLoading: teachersLoading } =
    //     useGetTeacherByStudentUserIdQuery((user?.studentId || '') as string)
    const { data: specialties, isLoading: specialtyLoading } =
        useGetAllSpecialtiesQuery('')
    const { data: categories, isLoading: categoriesLoading } =
        useGetMaterialCategoriesQuery('')

    const location = useLocation()

    const componentLoading = specialtyLoading || categoriesLoading

    useEffect(() => {
        setLoading(componentLoading)
    }, [specialtyLoading, categoriesLoading])

    useEffect(() => {
        dispatch(resetFilter())
        dispatch(resetSort())
    }, [location.pathname])

    if (componentLoading)
        return (
            <CircularProgress size={30} sx={{ mx: 'auto', display: 'block' }} />
        )

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs container alignItems="center">
                <Grid item xs={'auto'}>
                    <FilterMenu />
                </Grid>
                <Grid item xs={'auto'}>
                    <Divider sx={{ height: 25 }} orientation="vertical" />
                </Grid>
                <Grid item xs={'auto'}>
                    <SortMenu />
                </Grid>
            </Grid>
            <Grid item xs={'auto'}>
                <Search />
            </Grid>
        </Grid>
    )
}

type LoadedItemProps = {
    xs: number | 'auto'
    loading?: boolean
    data?: any
}

const LoadedItem: React.FC<LoadedItemProps> = ({
    xs,
    loading,
    children,
    data,
}) => {
    if (!loading && !data) return null

    return (
        <Grid item xs={xs}>
            {children}
        </Grid>
    )
}

export default MaterialsToolbar
