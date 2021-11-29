import { IconButton, Menu as MUIMenu, makeStyles, MenuItem as MUIMenuItem, Typography } from '@material-ui/core'
import { AccountCircle, ExitToApp } from '@material-ui/icons'
import React, { forwardRef, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { setAuth } from '../../redux/actions/auth-actions'
import Tooltip from '../Tooltip/Tooltip'

const Menu = ({ setAuth }) => {
    const classes = makeStyles(styles)()
    const { storage } = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(false)

    const closeHandler = () => setAnchorEl(null)

    const openHandler = (event) => setAnchorEl(event.currentTarget)


    const MenuItem = forwardRef((props, ref) => {
        const onClick = (event) => {
            if (typeof props.onClick === 'function') {
                closeHandler()
                props.onClick(event)
            }
        }

        return (
            <MUIMenuItem {...props} onClick={onClick} ref={ref}>
                {props.children}
            </MUIMenuItem>
        )
    })

    const logoutHandler = () => {
        storage.removeItem('token')
        setAuth(false)
    }

    return (
        <>
            <Tooltip title='Menu'>
                <IconButton
                    color='inherit'
                    onClick={openHandler}
                >
                    <AccountCircle className={classes.icon} />
                </IconButton>
            </Tooltip>
            <MUIMenu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!anchorEl}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={closeHandler}
            >
                <MenuItem>
                    <AccountCircle className={classes.menuIcon} color='primary' />
                    <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                    <ExitToApp className={classes.menuIcon} color='primary' />
                    <Typography>Logout</Typography>
                </MenuItem>
            </MUIMenu>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setAuth: (value) => dispatch(setAuth(value))
})

export default connect(null, mapDispatchToProps)(Menu)

const styles = theme => ({
    icon: {
        fontSize: '2rem'
    },
    menuIcon: {
        marginRight: theme.spacing(1)
    },
})