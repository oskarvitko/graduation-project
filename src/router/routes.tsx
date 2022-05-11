import { ROLES } from '../constants'
import Auth from 'pages/auth'
import { HomePage } from '../pages'

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
        component: <HomePage />,
        isPrivate: true,
    },
    {
        path: 'login',
        component: <Auth />,
        isPrivate: false,
    },
]
