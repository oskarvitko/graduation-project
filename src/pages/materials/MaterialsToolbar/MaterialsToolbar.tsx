import { Grid, CircularProgress, Divider } from '@mui/material'
import { ROLES } from '../../../constants'
import useRole from 'hook/useRole'
import React, { useEffect } from 'react'
import Search from './Search'
import { filterSlice } from 'store/reducers/filterReducer'
import { useAppDispatch } from 'hook/redux'
import FilterMenu from './FilterMenu'
import SortMenu from './SortMenu'
import { materialSortSlice } from 'store/reducers/materialSortReducer'
import { modeType } from '../Materials'
import EditMaterialMenu from './AddMaterial/EditMaterialMenu'
import AddSubjectMenu from './AddSubject/AddSubjectMenu'

type MaterialsToolbatProps = {
    disabled: boolean
    setLoading: (value: boolean) => void
    mode?: modeType
    refetchMaterials: () => void
}

const MaterialsToolbar: React.FC<MaterialsToolbatProps> = ({
    setLoading,
    disabled,
    mode,
    refetchMaterials,
}) => {
    const { hasOneOfRoles } = useRole()

    const { resetFilter } = filterSlice.actions
    const { resetSort } = materialSortSlice.actions
    const dispatch = useAppDispatch()

    const componentLoading = false

    useEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        dispatch(resetFilter())
        dispatch(resetSort())
    }, [mode])

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
                {hasOneOfRoles([ROLES.TEACHER, ROLES.MODERATOR]) && (
                    <>
                        <Grid item xs={'auto'}>
                            <Divider
                                sx={{ height: 25 }}
                                orientation="vertical"
                            />
                        </Grid>
                        <Grid item xs={'auto'}>
                            <EditMaterialMenu
                                refetchMaterials={refetchMaterials}
                            />
                        </Grid>
                    </>
                )}
                {hasOneOfRoles([
                    ROLES.ADMIN,
                    ROLES.TEACHER,
                    ROLES.MODERATOR,
                ]) && (
                    <>
                        <Grid item xs={'auto'}>
                            <Divider
                                sx={{ height: 25 }}
                                orientation="vertical"
                            />
                        </Grid>
                        <Grid item xs={'auto'}>
                            <AddSubjectMenu />
                        </Grid>
                    </>
                )}
            </Grid>
            <Grid item xs={'auto'}>
                <Search />
            </Grid>
        </Grid>
    )
}

export default MaterialsToolbar
