import { IconButton, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'

type SearchProps = {
    onChange: (value: string) => void
}

const Search: React.FC<SearchProps> = (props) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        if (open) {
            ref?.current?.focus()
        }
    }, [open])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.onChange(value)
        }, 400)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <TextField
            size="small"
            inputRef={ref}
            variant="outlined"
            disabled={!open}
            value={value}
            onChange={onChange}
            placeholder="Название учебного материала"
            sx={{
                width: open ? 320 : 50,
                transition: 'width .3s ease',
                '& .MuiOutlinedInput-root': {
                    pl: 1,
                },
                fieldset: {
                    borderColor: open
                        ? 'rgba(0, 0, 0, 0.26)'
                        : 'transparent !important',
                },
            }}
            InputProps={{
                startAdornment: (
                    <IconButton onClick={() => setOpen((prev) => !prev)}>
                        <SearchIcon color={open ? 'primary' : 'inherit'} />
                    </IconButton>
                ),
            }}
        />
    )
}

export default Search
