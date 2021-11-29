import { useRedirect } from 'hookrouter'
import { useRoutes } from 'hookrouter'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader/PageHeader'
import { AuthPage } from '../pages/AuthPage'
import { NotFoundPage } from '../pages/NotFound'
import { setStorage } from '../redux/actions/auth-actions'
import routes from './routes'

const AppRouter = ({ setStorage }) => {
    const { isAuth, storage } = useSelector(state => state.auth)
    const routesResult = useRoutes(routes)
    useRedirect('/', '/home')

    useEffect(() => {
        const isLocal = localStorage.getItem('storage') === 'local'
        if (isLocal) {
            setStorage(localStorage)
        } else {
            setStorage(sessionStorage)
        }
    }, [setStorage])

    if (!storage) return null

    return (
        <>
            {
                (isAuth || storage.getItem('token')) ?
                    <PageHeader>
                        {routesResult || <NotFoundPage />}
                    </PageHeader> :
                    <AuthPage />
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setStorage: (storage) => dispatch(setStorage(storage))
})

export default connect(null, mapDispatchToProps)(AppRouter)