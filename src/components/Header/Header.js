import React, { useEffect } from 'react'
import {
    AppBar,
    Link,
    makeStyles,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from '@material-ui/core'
import Menu from './Menu'
import { logout, setAuth, setUser } from '../../redux/actions/auth-actions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { delay } from '../../http'
import { A } from 'hookrouter'

const Header = (props) => {
    const {
        logout
    } = props

    const { storage, user, users } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const classes = makeStyles(styles)()

    useEffect(() => {
        dispatch(setUser(users.find(_user => _user.username === storage.getItem('username'))))
    }, [users])

    const logoutHandler = async () => {
        storage.removeItem('token')
        await delay()
        logout()
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography
                    variant='h5'
                    className={classes.title}
                >
                    Библиотека Университета
                </Typography>
                <Typography
                    variant='body1'
                >
                    <Link href="#">
                        <A href="/home" className={classes.link}>
                            Главная
                        </A>
                    </Link>
                    <Link href="#">
                        <A href="/materials" className={classes.link}>
                            Каталог
                        </A>
                    </Link>
                    <Link href="#">
                        <A href="/bookmarks" className={classes.link}>
                            Избранное
                        </A>
                    </Link>
                    <Link href="#">
                        <A href="/user" className={classes.link}>
                            {user?.username}
                        </A>
                    </Link>
                    <Link onClick={logoutHandler} href="#" className={classes.link}>
                        Выйти
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setAuth(false))
})

export default connect(null, mapDispatchToProps)(Header)

const styles = theme => ({
    title: {
        fontWeight: 700,
        flexGrow: 1
    },
    link: {
        color: "#fff",
        fontWeight: 700,
        marginLeft: theme.spacing(3),
        textDecoration: 'none'
    }
})