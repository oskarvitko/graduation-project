import { Menu } from '@mui/material'
import React, { FC } from 'react'

type HeaderMenuProps = {
    menuItems: JSX.Element
    button: (
        handleClick: (event: React.MouseEvent<HTMLElement>) => void
    ) => JSX.Element
}

const HeaderMenu: FC<HeaderMenuProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = !!anchorEl

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            {props.button(handleClick)}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        bgcolor: 'var(--color-primary)',
                        color: 'var(--color-text-secondary)',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'var(--color-primary)',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderRadius: 0,
                        },
                    },
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                }}
            >
                {props.menuItems.props.children}
            </Menu>
        </>
    )
}

export default HeaderMenu
