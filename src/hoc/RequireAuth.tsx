import React, { ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

type RequireAuthProps = {
    children: JSX.Element
}

const RequireAuth = ({ children }: RequireAuthProps) => {
    const location = useLocation()
    const auth = true

    if (!auth) return <Navigate to="/login" state={{ from: location }} />

    return children
}

export default RequireAuth
