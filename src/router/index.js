import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from 'components/layout'
import RequireAuth from '../hoc/RequireAuth'
import { routes } from './routes'
import { NotFoundPage } from '../pages'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            route.private ? (
                                <RequireAuth>{route.component}</RequireAuth>
                            ) : (
                                route.component
                            )
                        }
                    />
                ))}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
