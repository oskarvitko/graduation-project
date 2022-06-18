import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import React from 'react'
import { ICategory } from 'structures/ICategory'

type MaterialCategoryFilterProps = {
    onChange: (e: SelectChangeEvent<string[]>) => void
    value?: string[]
    categories: ICategory[]
}

const MaterialCategoryFilter: React.FC<MaterialCategoryFilterProps> = ({
    categories,
    value = [],
    onChange,
}) => {
    const id = useId()

    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={id}>Категория</InputLabel>
            <Select
                labelId={id}
                multiple
                value={value}
                label="Категория"
                onChange={onChange}
                renderValue={() => 'Категория'}
            >
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.category}>
                        <Checkbox
                            checked={value.indexOf(category.category) > -1}
                        />
                        <ListItemText>{category.category}</ListItemText>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default MaterialCategoryFilter
