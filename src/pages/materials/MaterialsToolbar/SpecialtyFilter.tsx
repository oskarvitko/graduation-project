import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { ISpecialty } from 'models/ISpecialty'
import React from 'react'

type SpecialtyFilterProps = {
    onChange: (e: SelectChangeEvent) => void
    value?: string
    specialties: ISpecialty[] | undefined
}

const SpecialtyFilter: React.FC<SpecialtyFilterProps> = ({
    specialties,
    value = '',
    onChange,
}) => {
    const id = useId()

    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={id}>Специальность</InputLabel>
            <Select
                labelId={id}
                value={value}
                label="Специальность"
                onChange={onChange}
            >
                <MenuItem value={''}>Любая</MenuItem>
                {specialties &&
                    specialties.map((specialty) => (
                        <MenuItem key={specialty.id} value={specialty.id}>
                            {specialty.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

export default SpecialtyFilter
