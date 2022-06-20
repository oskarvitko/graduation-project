import { IconButton, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { filterSlice } from 'store/reducers/filterReducer'

const Search: React.FC = () => {
    const { materialName } = useAppSelector((state) => state.filter)
    const { setMaterialName } = filterSlice.actions
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            ref?.current?.focus()
        }
    }, [open])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaterialName(event.target.value))
    }

    return (
        <TextField
            size="small"
            inputRef={ref}
            variant="outlined"
            disabled={!open}
            value={materialName}
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
