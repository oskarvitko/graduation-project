import { useAppSelector } from 'hook/redux'
import useRole from 'hook/useRole'
import { Navigate, useLocation } from 'react-router-dom'

type RequireAuthProps = {
    children: JSX.Element
    roles?: string[]
}

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const location = useLocation()
    const { auth } = useAppSelector((state) => state.user)
    const { hasOneOfRoles } = useRole()

    if (!auth)
        return (
            <Navigate to={'/login'} state={{ from: location }} replace={true} />
        )
    if (roles && !hasOneOfRoles(roles))
        return <Navigate to={'/'} replace={true} />

    return children
}

export default RequireAuth
