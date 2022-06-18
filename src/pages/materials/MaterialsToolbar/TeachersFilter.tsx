import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { IUser } from 'models/IUser'
import React, { useState } from 'react'

type TeachersFilterProps = {
    onChange: (value: string | undefined) => void
    teachers: IUser[] | undefined
}

const TeachersFilter: React.FC<TeachersFilterProps> = ({
    teachers,
    ...props
}) => {
    const id = useId()

    const [value, setValue] = useState('')

    const onChange = (event: SelectChangeEvent) => {
        setValue(event.target.value)
        props.onChange(event.target.value || undefined)
    }

    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={id}>Преподаватель</InputLabel>
            <Select
                labelId={id}
                value={value}
                label="Преподаватель"
                onChange={onChange}
            >
                <MenuItem value={''}>Любой</MenuItem>
                {teachers &&
                    teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                            {teacher.userName}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

export default TeachersFilter
