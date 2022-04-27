import { Typography } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './index.module.scss'
import logoUrl from '../../static/logo.png'

const Header = () => {
    return (
        <header className={styles.header}>
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
                    <ul className={styles.list}>
                        <li>
                            <NavLink to="/">Главная</NavLink>
                        </li>
                        <li>
                            <NavLink to="/materials">Учебные издания</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
