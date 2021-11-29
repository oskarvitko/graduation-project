import React from 'react'
import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core'
import Menu from './Menu'

const Header = () => {
    const classes = makeStyles(styles)()

    return (
        <AppBar>
            <Toolbar>
                <Typography
                    variant='h5'
                    className={classes.title}
                >
                    Universe Library
                </Typography>
                <Menu />
            </Toolbar>
        </AppBar>
    )
}

export default Header

const styles = theme => ({
    title: {
        fontWeight: 700,
        flexGrow: 1
    }
})