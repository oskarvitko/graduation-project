import Auth from 'pages/auth'
import { HomePage } from '../pages'
import Profile from 'pages/profile'
import Materials from 'pages/materials'
import Bookmarks from 'pages/bookmarks/Bookmarks'

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
        component: <Bookmarks />,
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
]
