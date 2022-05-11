import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'
import { motion } from 'framer-motion'

const Layout = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Header />
            <main style={{ paddingTop: 56 }}>
                <Outlet />
            </main>
        </motion.div>
    )
}

export default Layout
