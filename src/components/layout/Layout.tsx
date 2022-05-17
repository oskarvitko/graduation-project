import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'
import { motion } from 'framer-motion'
import { Box, Container } from '@mui/material'
import classes from './Layout.module.scss'

const Layout = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Header />
            <main className={classes.main}>
                <Container sx={{ position: 'relative', zIndex: 1 }}>
                    <Outlet />
                </Container>
            </main>
        </motion.div>
    )
}

export default Layout
