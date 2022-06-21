import { FilterAlt } from '@mui/icons-material'
import {
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material'
import useRole from 'hook/useRole'
import React from 'react'
import MaterialTypeFilter from './MaterialTypeFilter'
import SpecialtyFilter from './SpecialtyFilter'
import { ROLES } from '../../../constants'
import { filterSlice } from 'store/reducers/filterReducer'
import { useAppDispatch } from 'hook/redux'
import RatingFilter from './RatingFilter'
import SubjectFilter from './SubjectFilter'

const FilterMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { hasRole } = useRole()
    const open = !!anchorEl
    const { resetFilter } = filterSlice.actions
    const dispatch = useAppDispatch()

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
                <Divider />
                <MenuItem>
                    <SubjectFilter />
                </MenuItem>
                <Divider />
                {hasRole(ROLES.ADMIN) && (
                    <div>
                        <MenuItem>
                            <SpecialtyFilter />
                        </MenuItem>
                        <Divider />
                    </div>
                )}
                <MenuItem>
                    <RatingFilter />
                </MenuItem>
                <Divider />

                <MenuItem>
                    <Button
                        onClick={() => dispatch(resetFilter())}
                        sx={{ ml: 'auto' }}
                        variant="outlined"
                    >
                        Сбросить
                    </Button>
                </MenuItem>
            </Menu>
        </>
    )
}

export default FilterMenu
