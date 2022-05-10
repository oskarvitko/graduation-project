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
                {routes.map(({ path, component, isPrivate }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            isPrivate ? (
                                <RequireAuth>{component}</RequireAuth>
                            ) : (
                                component
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
