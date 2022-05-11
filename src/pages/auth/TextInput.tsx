import { TextField } from '@mui/material'
import React from 'react'

type TextInputProps = {
    name: string
    validation: any
    label: string
    type?: string
}

export const createTextInput = (
    register: any,
    disabled: boolean,
    errors: any,
    size: string
) => {
    const TextInput: React.FC<TextInputProps> = ({
        label,
        name,
        validation,
        type = 'text',
    }) => {
        return (
            <TextField
                fullWidth
                variant="outlined"
                label={label}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                disabled={disabled}
                type={type}
                size={size}
                {...register(name, validation)}
            />
        )
    }

    return TextInput
}
