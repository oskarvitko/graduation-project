import Auth from 'pages/auth'
import { HomePage } from '../pages'

export type RouteType = {
    path: string
    component: JSX.Element
    isPrivate: boolean
}

export const routes: RouteType[] = [
    {
        path: '',
        component: <HomePage />,
        isPrivate: false,
    },
    {
        path: 'login',
        component: <Auth />,
        isPrivate: false,
    },
]
