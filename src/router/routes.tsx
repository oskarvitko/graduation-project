import { ROLES } from '../constants'
import Auth from 'pages/auth'
import { HomePage } from '../pages'
import Profile from 'pages/profile'

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
        component: <div>Materials</div>,
        isPrivate: true,
    },
    {
        path: '/bookmarks',
        component: <div>Избранное</div>,
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
