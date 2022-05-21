import React, { useState } from 'react'
import { AccountCircle, Logout, Star } from '@mui/icons-material'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import logoUrl from '../../static/logo.png'
import PrivateBlock from '../privateBlock/PrivateBlock'
import { ROUTES } from '../../constants'
import AppProgress from './AppProgress'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { userSlice } from 'store/reducers/userReducer'
import { Container, Divider, Drawer, MenuItem } from '@mui/material'
import HeaderMenu from './HeaderMenu'
import { useGetUserByTokenQuery } from 'api/userApi'
import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'

const Header = () => {
    const { loadingProgress } = useAppSelector((state) => state.app)
    const { auth } = useAppSelector((state) => state.user)
    const { data: user } = useGetUserByTokenQuery()
    const dispatch = useAppDispatch()
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

    const [rightMenu, setRightMenu] = useState(false)

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        setRightMenu((prev) => !!prev)
    }

    const logout = () => dispatch(userSlice.actions.logout())

    return (
        <header className={styles.header}>
            <AppProgress progress={loadingProgress} />
            <Container>
                <nav className={styles.nav}>
                    <Link to="" className={styles.logo}>
                        <img
                            src={logoUrl}
                            alt="Минский инновационный университет"
                        />
                        <span>
                            <div>МИУ</div>
                            Электронная библиотека
                        </span>
                    </Link>
                    <div className={styles.list}>
                        <PrivateBlock>
                            <NavLink to={ROUTES.materials.path}>
                                {ROUTES.materials.text}
                            </NavLink>
                        </PrivateBlock>
                        {auth ? (
                            <>
                                <HeaderMenu
                                    anchor="right"
                                    menuItems={
                                        <>
                                            <NavLink to={ROUTES.profile.path}>
                                                <AccountCircle sx={{ mr: 1 }} />
                                                {ROUTES.profile.text}
                                            </NavLink>
                                            <NavLink to={ROUTES.bookmarks.path}>
                                                <Star sx={{ mr: 1 }} />
                                                {ROUTES.bookmarks.text}
                                            </NavLink>
                                            <Divider />
                                            <MenuItem
                                                onClick={() =>
                                                    setOpenConfirmDialog(true)
                                                }
                                            >
                                                <Logout sx={{ mr: 1 }} />
                                                Выйти
                                            </MenuItem>
                                        </>
                                    }
                                />
                            </>
                        ) : (
                            <NavLink to="/login">
                                <AccountCircle />
                                <span>Вход</span>
                            </NavLink>
                        )}
                    </div>
                </nav>
            </Container>
            <ConfirmDialog
                open={openConfirmDialog}
                title="Уверены что хотите выйти?"
                onAccept={() => {
                    logout()
                    setOpenConfirmDialog(false)
                }}
                onCancel={() => setOpenConfirmDialog(false)}
                onClose={() => setOpenConfirmDialog(false)}
            />
        </header>
    )
}

export default Header
