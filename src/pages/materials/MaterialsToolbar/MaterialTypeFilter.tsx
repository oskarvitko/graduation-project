import {
    Checkbox,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { materialTypes } from '../../../constants'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import React from 'react'
import { filterSlice } from 'store/reducers/filterReducer'

const MaterialTypeFilter: React.FC = () => {
    const id = useId()
    const { materialType } = useAppSelector((state) => state.filter)
    const dispatch = useAppDispatch()
    const setMaterialType = (value: string[]) =>
        dispatch(filterSlice.actions.setMaterialType(value))

    const onChange = (e: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = e

        setMaterialType(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <Grid container spacing={1} direction={'column'}>
            <Grid item>
                <FormControl size="small" fullWidth>
                    <InputLabel id={id}>Формат материала</InputLabel>
                    <Select
                        multiple
                        labelId={id}
                        value={materialType}
                        label="Формат материала"
                        onChange={onChange}
                        renderValue={(value) => 'Формат материала'}
                    >
                        {materialTypes &&
                            materialTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    <Checkbox
                                        checked={
                                            materialType.indexOf(type) > -1
                                        }
                                    />
                                    <ListItemText>{type}</ListItemText>
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container spacing={1}>
                {materialType.map((type) => (
                    <Grid item key={type}>
                        <Chip label={type} size={'small'} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default MaterialTypeFilter
