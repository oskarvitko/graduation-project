import useRole from 'hook/useRole'
import React from 'react'
import { NavLink } from 'react-router-dom'

type PrivateLinkProps = {
    to: string
    children: any
    roles: [string]
}

const PrivateLink = (props: PrivateLinkProps) => {
    const { to, children, roles = [] } = props

    const { hasOneOfRoles } = useRole()

    if (!hasOneOfRoles(roles)) return null

    return <NavLink to={to}>{children}</NavLink>
}

export default PrivateLink
