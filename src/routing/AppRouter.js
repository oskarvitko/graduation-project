import { useRedirect } from 'hookrouter'
import { useRoutes } from 'hookrouter'
import React from 'react'
import { NotFoundPage } from '../pages/NotFound'
import routes from './routes'

const AppRouter = () => {
    const routesResult = useRoutes(routes)
    useRedirect('/home', '/')

    return routesResult || <NotFoundPage />
}

export default AppRouter