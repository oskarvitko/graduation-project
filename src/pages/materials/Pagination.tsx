import React from 'react'
import { Pagination as MUIPagination } from '@mui/material'

type PaginationProps = {
    total: number
    page: number
    setPage: (value: number) => void
    disabled: boolean
}

const Pagination: React.FC<PaginationProps> = ({
    total,
    page,
    setPage,
    disabled,
}) => {
    const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <MUIPagination
            sx={{ ul: { justifyContent: 'center' }, mt: 1 }}
            shape="rounded"
            variant="outlined"
            count={total}
            page={page}
            color="primary"
            onChange={onChange}
            disabled={disabled}
        />
    )
}

export default Pagination
