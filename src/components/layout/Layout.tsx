import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'
import { motion } from 'framer-motion'
import { Container } from '@mui/material'
import classes from './Layout.module.scss'
import BreadCrumbs from './BreadCrumbs'

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
                    <BreadCrumbs />
                    <Outlet />
                </Container>
            </main>
        </motion.div>
    )
}

export default Layout