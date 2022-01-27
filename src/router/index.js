import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from 'components/Layout'
import Home from 'router/home'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
