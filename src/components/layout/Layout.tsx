import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'
import { motion } from 'framer-motion'
import { Container, Grid, styled } from '@mui/material'
import BreadCrumbs from './BreadCrumbs'
import Sidebar from '../sidebar/Sidebar'
import { useAppSelector } from 'hook/redux'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean
    auth?: boolean
}>(({ theme, open, auth }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(7),
    minHeight: 'calc(100vh - 56px)',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: auth ? 56 : 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: '200px',
    }),
}))

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { auth } = useAppSelector((state) => state.user)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Grid container>
                <Header open={sidebarOpen} setOpen={setSidebarOpen} />
                <Main open={sidebarOpen} auth={auth}>
                    <Container sx={{ position: 'relative', zIndex: 1 }}>
                        <BreadCrumbs />
                        <Outlet />
                    </Container>
                </Main>
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            </Grid>
        </motion.div>
    )
}

export default Layout
