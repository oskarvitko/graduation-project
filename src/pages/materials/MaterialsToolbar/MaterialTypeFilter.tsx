import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { IMaterialType } from 'models/IMaterialType'
import React from 'react'

type MaterialTypeFilterProps = {
    onChange: (e: SelectChangeEvent) => void
    value?: string
}

const MaterialTypeFilter: React.FC<MaterialTypeFilterProps> = ({
    value = '',
    onChange,
}) => {
    const types: IMaterialType[] = [
        {
            id: 0,
            name: 'docx',
        },
        {
            id: 1,
            name: 'pdf',
        },
        {
            id: 2,
            name: 'ppt',
        },
        {
            id: 3,
            name: 'xlsx',
        },
    ]
    const id = useId()

    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={id}>Тип материала</InputLabel>
            <Select
                labelId={id}
                value={value}
                label="Тип материала"
                onChange={onChange}
            >
                <MenuItem value={''}>Любой</MenuItem>
                {types &&
                    types.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                            {type.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

export default MaterialTypeFilter
