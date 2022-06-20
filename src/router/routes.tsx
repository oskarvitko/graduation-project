import Auth from 'pages/auth'
import { HomePage } from '../pages'
import Profile from 'pages/profile'
import Materials from 'pages/materials'
import MaterialDetails from 'pages/materials/Details/MaterialDetails'
import { Navigate } from 'react-router-dom'

export type RouteType = {
    path: string
    component: JSX.Element
    isPrivate: boolean
    roles?: string[]
}

export const routes: RouteType[] = [
    {
        path: '',
        component: <HomePage />,
        isPrivate: false,
    },
    {
        path: '/materials',
        component: <Materials />,
        isPrivate: true,
    },
    {
        path: '/bookmarks',
        component: <Materials mode="bookmarks" />,
        isPrivate: true,
    },
    {
        path: '/login',
        component: <Auth />,
        isPrivate: false,
    },
    {
        path: '/profile',
        component: <Profile />,
        isPrivate: true,
    },
    {
        path: '/material',
        component: <Navigate to="/materials" replace={true} />,
        isPrivate: true,
    },
    {
        path: '/material/:id',
        component: <MaterialDetails />,
        isPrivate: true,
    },
]
