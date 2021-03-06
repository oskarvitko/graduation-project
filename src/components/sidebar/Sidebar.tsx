import { AccountCircle, Bookmark, Logout, PeopleAlt } from '@mui/icons-material'
import SidebarMenu from 'components/sidebar/SidebarMenu'
import HeaderTooltip from 'components/header/HeaderTooltip'
import { ROUTES, ROLES } from '../../constants'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Divider, MenuItem } from '@mui/material'
import PrivateBlock from 'components/privateBlock/PrivateBlock'
import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { userSlice } from 'store/reducers/userReducer'

type SidebarProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    const { auth } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const logout = () => dispatch(userSlice.actions.logout())

    if (!auth) return null

    return (
        <>
            <SidebarMenu
                open={open}
                setOpen={setOpen}
                menuItems={
                    <>
                        <HeaderTooltip title={ROUTES.profile.text} open={open}>
                            <NavLink to={ROUTES.profile.path}>
                                <AccountCircle sx={{ mr: 1 }} />
                                {ROUTES.profile.text}
                            </NavLink>
                        </HeaderTooltip>
                        <HeaderTooltip
                            title={ROUTES.bookmarks.text}
                            open={open}
                        >
                            <NavLink to={ROUTES.bookmarks.path}>
                                <Bookmark sx={{ mr: 1 }} />
                                {ROUTES.bookmarks.text}
                            </NavLink>
                        </HeaderTooltip>
                        <Divider />
                        <PrivateBlock roles={[ROLES.MODERATOR, ROLES.ADMIN]}>
                            <HeaderTooltip
                                title={ROUTES.users.text}
                                open={open}
                            >
                                <NavLink to={ROUTES.users.path}>
                                    <PeopleAlt sx={{ mr: 1 }} />
                                    {ROUTES.users.text}
                                </NavLink>
                            </HeaderTooltip>
                            <Divider />
                        </PrivateBlock>
                        <MenuItem onClick={() => setOpenConfirmDialog(true)}>
                            <Logout sx={{ mr: 1 }} />
                            ??????????
                        </MenuItem>
                    </>
                }
            />
            <ConfirmDialog
                open={openConfirmDialog}
                title="?????????????? ?????? ???????????? ???????????"
                onAccept={() => {
                    logout()
                    setOpenConfirmDialog(false)
                }}
                onCancel={() => setOpenConfirmDialog(false)}
                onClose={() => setOpenConfirmDialog(false)}
            />
        </>
    )
}

export default Sidebar
