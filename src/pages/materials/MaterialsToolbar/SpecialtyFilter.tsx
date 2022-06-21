import {
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { useGetUserByTokenQuery } from 'api/userApi'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import React from 'react'
import { filterSlice } from 'store/reducers/filterReducer'

const SpecialtyFilter: React.FC = () => {
    const id = useId()

    const { data: user } = useGetUserByTokenQuery()
    const { data: specialties } = useGetAllSpecialtiesQuery(user?.id || '', {
        skip: !user,
    })
    const dispatch = useAppDispatch()
    const { setSpecialty } = filterSlice.actions

    const { specialtyId } = useAppSelector((state) => state.filter)

    const onChange = (e: SelectChangeEvent) => {
        dispatch(setSpecialty(e.target.value))
    }

    if (!specialties)
        return (
            <CircularProgress size={30} sx={{ mx: 'auto', display: 'block' }} />
        )

    return (
        <Grid container spacing={1} direction={'column'}>
            <Grid item>
                <FormControl size="small" fullWidth>
                    <InputLabel id={id}>Специальность</InputLabel>
                    <Select
                        labelId={id}
                        value={specialtyId}
                        label="Специальность"
                        onChange={onChange}
                    >
                        <MenuItem value={''}>Любая</MenuItem>
                        {specialties &&
                            specialties.map((specialty) => (
                                <MenuItem
                                    key={specialty.id}
                                    value={specialty.id}
                                >
                                    {specialty.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item>
                    <Chip
                        label={
                            specialties.find((item) => item.id === specialtyId)
                                ?.name || 'Любая'
                        }
                        size={'small'}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SpecialtyFilter
