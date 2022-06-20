import { Sort } from '@mui/icons-material'
import {
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import React from 'react'
import {
    fieldType as RFieldType,
    materialSortSlice,
    sortType as RSortType,
} from '../../../store/reducers/materialSortReducer'

type fieldType = {
    name: string
    value: RFieldType
}

type sortType = {
    name: string
    value: RSortType
}

const fields: fieldType[] = [
    {
        name: 'Название',
        value: 'name',
    },
    {
        name: 'Дата создания',
        value: 'createDate',
    },
    {
        name: 'Формат',
        value: 'materialType',
    },
]

function getSorts(isDate: boolean): sortType[] {
    return [
        {
            name: isDate ? 'Сначала старые' : 'От А до Я',
            value: 'ASC',
        },
        {
            name: isDate ? 'Сначала новые' : 'От Я до А',
            value: 'DESC',
        },
    ]
}

const SortMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = !!anchorEl

    const { field, sort } = useAppSelector((state) => state.materialSort)
    const dispatch = useAppDispatch()
    const { setSort, setField, setGVFuction } = materialSortSlice.actions

    const fieldInputId = useId()
    const sortInputId = useId()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const fieldInputHandler = (e: SelectChangeEvent) => {
        dispatch(setField(e.target.value as RFieldType))
    }
    const sortInputHandler = (e: SelectChangeEvent) => {
        if (e.target.value === 'createDate') {
            dispatch(
                setGVFuction((a, b) => [
                    new Date(a.createDate).getTime(),
                    new Date(b.createDate).getTime(),
                ])
            )
            return dispatch(setSort(e.target.value as RSortType))
        }

        dispatch(setGVFuction(undefined))
        dispatch(setSort(e.target.value as RSortType))
    }

    return (
        <>
            <Tooltip title="Сортировка">
                <IconButton onClick={handleClick}>
                    <Sort color="primary" />
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
                    <FormControl size="small" fullWidth>
                        <InputLabel id={fieldInputId}>Поле</InputLabel>
                        <Select
                            labelId={fieldInputId}
                            value={field}
                            label="Поле"
                            onChange={fieldInputHandler}
                        >
                            {fields.map((field) => (
                                <MenuItem key={field.value} value={field.value}>
                                    {field.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MenuItem>
                <MenuItem>
                    <FormControl size="small" fullWidth>
                        <InputLabel id={sortInputId}>Сортировка</InputLabel>
                        <Select
                            labelId={sortInputId}
                            value={sort}
                            label="Сортировка"
                            onChange={sortInputHandler}
                        >
                            {getSorts(field === 'createDate').map((sort) => (
                                <MenuItem key={sort.value} value={sort.value}>
                                    {sort.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MenuItem>
            </Menu>
        </>
    )
}

export default SortMenu
