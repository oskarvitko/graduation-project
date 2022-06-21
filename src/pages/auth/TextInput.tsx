import { TextField } from '@mui/material'
import React from 'react'

type TextInputProps = {
    name: string
    validation: any
    label: string
    type?: string
    autocomplete?: boolean
    multiline?: boolean
    ref?: any
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
        autocomplete = true,
        multiline = false,
        ref = null,
    }) => {
        return (
            <TextField
                ref={ref}
                fullWidth
                variant="outlined"
                label={label}
                autoComplete={autocomplete ? 'on' : 'new-password'}
                error={!!errors[name]}
                multiline={multiline}
                minRows={multiline ? 3 : 1}
                maxRows={multiline ? 6 : 1}
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
