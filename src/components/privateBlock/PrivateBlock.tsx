import { useAppSelector } from 'hook/redux'
import useRole from 'hook/useRole'
import React from 'react'
import { NavLink } from 'react-router-dom'

type PrivateBlockProps = {
    children: any
    roles?: [string]
}

const PrivateBlock = (props: PrivateBlockProps) => {
    const { children, roles = [] } = props
    const { auth } = useAppSelector((state) => state.user)

    const { hasOneOfRoles } = useRole()

    if (!auth) return null
    if (roles.length && !hasOneOfRoles(roles)) return null

    return children
}

export default PrivateBlock
