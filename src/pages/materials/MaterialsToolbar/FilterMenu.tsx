import { FilterAlt } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React from 'react'
import MaterialTypeFilter from './MaterialTypeFilter'

const FilterMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = !!anchorEl

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Tooltip title="Фильтрация">
                <IconButton onClick={handleClick}>
                    <FilterAlt color="primary" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                sx={{ '& .MuiList-root': { width: 350 } }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <MaterialTypeFilter />
                </MenuItem>
            </Menu>
        </>
    )
}

export default FilterMenu
