import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'

const Layout = () => {
    // useEffect(() => {
    //     document.body.setAttribute('data-theme', 'miu')
    // }, [])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout
