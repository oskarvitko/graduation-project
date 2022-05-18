import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from 'components/layout'
import RequireAuth from '../hoc/RequireAuth'
import { routes } from './routes'
import { NotFoundPage } from '../pages'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { userSlice } from 'store/reducers/userReducer'
import AppLoader from 'components/appLoader/appLoader'
import { useLazyGetUserByTokenQuery } from 'api/userApi'

const AppRouter = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [getUserByToken] = useLazyGetUserByTokenQuery()
    const { token } = useAppSelector((state) => state.user)

    const checkIsTokenValid = async () => {
        try {
            const user = await getUserByToken(token).unwrap()
            if (user) {
                dispatch(userSlice.actions.login(token))
            }
            setLoading(false)
        } catch (e: any) {
            if (e?.status === 401) return setLoading(false)

            console.log(e)
        }
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
