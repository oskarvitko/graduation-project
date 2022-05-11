import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from 'components/layout'
import RequireAuth from '../hoc/RequireAuth'
import { routes } from './routes'
import { NotFoundPage } from '../pages'
import { useAppDispatch } from 'hook/redux'
import { userSlice } from 'store/reducers/userReducer'
import { parseJwt } from 'util/jwt'
import { Grid, LinearProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { useLazyGetAllSpecialtiesQuery } from 'api/specialtyApi'
import AppLoader from 'components/appLoader/appLoader'

const AppRouter = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [getAllSpecialties] = useLazyGetAllSpecialtiesQuery()

    const checkIsTokenValid = async () => {
        const result = await getAllSpecialties('')
        const token = localStorage.getItem('token')
        if (result.isSuccess && token) {
            const { role, email } = parseJwt(token)
            dispatch(userSlice.actions.login({ role, email }))
        }
        setLoading(false)
    }

    useEffect(() => {
        checkIsTokenValid()
    }, [])

    return loading ? (
        <AppLoader />
    ) : (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map(({ path, component, isPrivate, roles }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            isPrivate ? (
                                <RequireAuth roles={roles}>
                                    {component}
                                </RequireAuth>
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
