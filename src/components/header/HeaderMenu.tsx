import { ChevronLeft, ChevronRight, Menu } from '@mui/icons-material'
import { Divider, Drawer, Grid, IconButton, MenuItem } from '@mui/material'
import React, { FC } from 'react'

type HeaderMenuProps = {
    menuItems: JSX.Element
    anchor: 'left' | 'top' | 'right' | 'bottom' | undefined
    button?: (
        handleClick: (event: React.MouseEvent<HTMLElement>) => void
    ) => JSX.Element
}

const HeaderMenu: FC<HeaderMenuProps> = (props) => {
    const [open, setOpen] = React.useState(false)

    const toggleMenu = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        setOpen((prev) => !prev)
    }

    return (
        <>
            {props.button &&
                props.button((e) => {
                    e.preventDefault()
                    toggleMenu(e)
                })}
            <Drawer
                // hideBackdrop
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: open ? '200px' : '56px',
                        borderRadius: 0,
                        color: 'var(--color-text-secondary)',
                        bgcolor: 'var(--color-primary)',
                        transition: 'width .4s ease',
                    },
                    'a, li': {
                        svg: {
                            mr: '16px !important',
                            borderRadius: 0,
                        },
                    },
                    svg: {
                        color: 'var(--color-text-secondary)',
                    },
                    li: {
                        px: 2,
                        py: 1.5,
                    },
                    a: {
                        width: '100%',
                        px: 2,
                        py: 1.5,
                        minHeight: 'auto !important',
                    },
                }}
                anchor={props.anchor}
                open={open}
                onClose={toggleMenu}
            >
                <Grid container sx={{ p: 1, pb: '7px' }}>
                    <IconButton onClick={toggleMenu}>
                        {open ? <ChevronRight /> : <Menu />}
                    </IconButton>
                </Grid>
                <Divider sx={{ mt: '0 !important' }} />
                {props.menuItems.props.children}
            </Drawer>
        </>
    )
}

export default HeaderMenu
