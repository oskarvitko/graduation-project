import { Breadcrumbs, Divider, Link, Typography } from '@mui/material'
import { ROUTES } from '../../constants'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

type Breadcrumb = {
    path: string
    text: string
} | null

const BreadCrumbs: React.FC = () => {
    const location = useLocation()
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

    const ignoreList: string[] = ['login']

    useEffect(() => {
        const links = [...new Set(location.pathname.split('/'))]

        for (const item of ignoreList) {
            if (links.includes(item)) return setBreadcrumbs([])
        }

        setBreadcrumbs(
            links.map((link) => {
                for (const route of Object.values(ROUTES)) {
                    if (route.path === '/' + link) {
                        return route
                    }
                }

                return null
            })
        )
    }, [location.pathname])

    return breadcrumbs.length <= 1 ? null : (
        <>
            <Breadcrumbs
                sx={{ mb: 2, fontWeight: 500 }}
                aria-label="breadcrumb"
            >
                {breadcrumbs.map((breadcrumb, i) => {
                    if (!breadcrumb) return null
                    if (i === breadcrumbs.length - 1)
                        return (
                            <Typography
                                sx={{ fontWeight: 500 }}
                                key={breadcrumb.path}
                                color="text.primary"
                            >
                                {breadcrumb.text}
                            </Typography>
                        )

                    return (
                        <Link
                            component={NavLink}
                            key={breadcrumb.path}
                            to={breadcrumb.path}
                            underline="hover"
                        >
                            {breadcrumb.text}
                        </Link>
                    )
                })}
            </Breadcrumbs>
            <Divider sx={{ my: 1 }} />
        </>
    )
}

export default BreadCrumbs
