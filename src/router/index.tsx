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
import { Alert, Snackbar } from '@mui/material'
import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'

const AppRouter = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [getUserByToken] = useLazyGetUserByTokenQuery()
    const { token, auth } = useAppSelector((state) => state.user)
    useGetAllSpecialtiesQuery('', { skip: !auth })
    useGetMaterialCategoriesQuery('', { skip: !auth })

    const checkIsTokenValid = async () => {
        setOpen(false)
        try {
            const user = await getUserByToken(token).unwrap()
            if (user) {
                dispatch(userSlice.actions.login(token))
            }
            setLoading(false)
        } catch (e: any) {
            if (e?.status === 401) return setLoading(false)

            console.log(e)
            setOpen(true)
            setTimeout(checkIsTokenValid, 5000)
        }
    }

    useEffect(() => {
        checkIsTokenValid()
    }, [])

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return loading ? (
        <>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert variant="filled" severity="error" onClose={handleClose}>
                    Unknown server error!
                </Alert>
            </Snackbar>
            <AppLoader />
        </>
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
