import React from 'react'
import { AccountCircle, Logout } from '@mui/icons-material'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import logoUrl from '../../static/logo.png'
import PrivateLink from './privateLink/PrivateLink'
import { ROLES } from '../../constants'
import AppProgress from './AppProgress'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { userSlice } from 'store/reducers/userReducer'
import { CircularProgress, Container, Divider, MenuItem } from '@mui/material'
import HeaderMenu from './HeaderMenu'
import { useGetUserByTokenQuery } from 'api/userApi'

const Header = () => {
    const { loadingProgress } = useAppSelector((state) => state.app)
    const { auth } = useAppSelector((state) => state.user)
    const { data: user, isLoading } = useGetUserByTokenQuery()
    const dispatch = useAppDispatch()

    const logout = (e: any) => {
        e.preventDefault()

        dispatch(userSlice.actions.logout())
    }

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
                        <NavLink to="/">Главная</NavLink>
                        <PrivateLink roles={[ROLES.ADMIN]} to="/materials">
                            Учебные издания
                        </PrivateLink>
                        {auth ? (
                            <HeaderMenu
                                menuItems={
                                    <>
                                        <MenuItem
                                            sx={{
                                                p: 0,
                                                a: { px: 2, py: 1 },
                                            }}
                                        >
                                            <PrivateLink to="/profile">
                                                <AccountCircle sx={{ mr: 1 }} />
                                                Профиль
                                            </PrivateLink>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={logout}>
                                            <Logout sx={{ mr: 1 }} />
                                            Выйти
                                        </MenuItem>
                                    </>
                                }
                                button={(onClick) => (
                                    <a href="/" onClick={onClick}>
                                        <AccountCircle />
                                        <span>{user?.email}</span>
                                    </a>
                                )}
                            />
                        ) : (
                            <NavLink to="/login">
                                <AccountCircle />
                                <span>Вход</span>
                            </NavLink>
                        )}
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header
