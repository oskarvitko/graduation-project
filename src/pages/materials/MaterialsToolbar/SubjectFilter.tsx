import {
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import React from 'react'
import { filterSlice } from 'store/reducers/filterReducer'
import { useGetAllSubjectsQuery } from 'api/subjectApi'
import { useGetUserByTokenQuery } from 'api/userApi'

const SubjectFilter: React.FC = () => {
    const id = useId()
    const { subjects: materialType } = useAppSelector((state) => state.filter)
    const dispatch = useAppDispatch()
    const setMaterialType = (value: string) =>
        dispatch(filterSlice.actions.setSubjects(value))
    const { data: user } = useGetUserByTokenQuery()
    const { data: materialTypes, isLoading } = useGetAllSubjectsQuery(
        user?.id || ''
    )

    const onChange = (e: SelectChangeEvent) => setMaterialType(e.target.value)

    if (isLoading)
        return (
            <CircularProgress size={30} sx={{ mx: 'auto', display: 'block' }} />
        )

    return (
        <Grid container spacing={1} direction={'column'}>
            <Grid item>
                <FormControl size="small" fullWidth>
                    <InputLabel id={id}>Предмет</InputLabel>
                    <Select
                        labelId={id}
                        value={materialType}
                        label="Предмет"
                        onChange={onChange}
                    >
                        <MenuItem value={''}>
                            <ListItemText>Любой</ListItemText>
                        </MenuItem>
                        {materialTypes &&
                            materialTypes.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id.toString()}
                                >
                                    <ListItemText>{item.name}</ListItemText>
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item>
                    <Chip
                        label={
                            materialTypes?.find(
                                (item) => item.id.toString() === materialType
                            )?.name || 'Любой'
                        }
                        size={'small'}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SubjectFilter
