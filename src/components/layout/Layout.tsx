import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'
import { motion } from 'framer-motion'
import { Container, Grid } from '@mui/material'
import BreadCrumbs from './BreadCrumbs'
import Sidebar from '../sidebar/Sidebar'
import { useAppSelector } from 'hook/redux'
import { Main } from './Main'

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
