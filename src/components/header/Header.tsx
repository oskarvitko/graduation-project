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

const Header = () => {
    const { loadingProgress } = useAppSelector((state) => state.app)
    const { auth } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const logout = (e: any) => {
        e.preventDefault()
        dispatch(userSlice.actions.logout())
    }

    return (
        <header className={styles.header}>
            <AppProgress progress={loadingProgress} />
            <div className="container">
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
                            <a href="/logout" onClick={logout}>
                                <Logout />
                                Выйти
                            </a>
                        ) : (
                            <NavLink to="/login">
                                <AccountCircle />
                                Вход
                            </NavLink>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
