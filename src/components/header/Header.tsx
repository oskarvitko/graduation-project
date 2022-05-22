import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import logoUrl from '../../static/logo.png'
import PrivateBlock from '../privateBlock/PrivateBlock'
import { ROUTES } from '../../constants'
import AppProgress from './AppProgress'
import { useAppSelector } from 'hook/redux'
import { Container } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

type HeaderProps = {
    open: boolean
    setOpen: (value: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
    const { loadingProgress } = useAppSelector((state) => state.app)
    const { auth } = useAppSelector((state) => state.user)

    return (
        <header
            className={styles.header}
            style={{
                width: auth
                    ? open
                        ? 'calc(100% - 200px)'
                        : 'calc(100% - 56px)'
                    : '100%',
            }}
        >
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
                        <NavLink to={ROUTES.home.path}>
                            {ROUTES.home.text}
                        </NavLink>
                        <PrivateBlock>
                            <NavLink to={ROUTES.materials.path}>
                                {ROUTES.materials.text}
                            </NavLink>
                        </PrivateBlock>
                        {!auth && (
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
