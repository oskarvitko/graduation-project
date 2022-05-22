import { ChevronRight, Menu } from '@mui/icons-material'
import { Divider, Drawer, Grid, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { FC } from 'react'

type SidebarMenuProps = {
    menuItems: JSX.Element
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarMenu: FC<SidebarMenuProps> = ({ open, setOpen, menuItems }) => {
    const theme = useTheme()
    const media_sm = useMediaQuery(theme.breakpoints.up('sm'))

    const toggleMenu = () => setOpen((prev) => !prev)

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        flexShrink: 0,
                        overflow: 'hidden',
                        width: open ? 200 : 56,
                        height: media_sm ? '100%' : open ? '100%' : '56px',
                        borderRadius: 0,
                        color: 'var(--color-text-secondary)',
                        bgcolor: 'var(--color-primary)',
                        transition: 'width .3s ease',
                    },
                    'a, li': {
                        whiteSpace: 'nowrap',
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
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--color-text-secondary)',
                        width: '100%',
                        px: 2,
                        py: '12px !important',
                        borderRight: '3px solid transparent',
                        borderRadius: 0,
                        '&.active': {
                            borderColor: 'var(--color-bg)',
                        },
                        '&:hover': {
                            bgcolor: 'var(--color-primary-darken)',
                        },
                    },
                }}
                anchor={'right'}
                open={open}
                onClose={toggleMenu}
            >
                <Grid container sx={{ p: 1, pb: '7px' }}>
                    <IconButton onClick={toggleMenu}>
                        {open ? <ChevronRight /> : <Menu />}
                    </IconButton>
                </Grid>
                <Divider sx={{ mt: '0 !important' }} />
                {menuItems}
            </Drawer>
        </>
    )
}

export default SidebarMenu
