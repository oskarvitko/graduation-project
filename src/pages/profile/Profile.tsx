import { TableBar } from '@mui/icons-material'
import {
    Container,
    Divider,
    Grid,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Box } from '@mui/system'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { useGetUserByTokenQuery } from 'api/userApi'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import React, { useEffect, useState } from 'react'

const Profile: React.FC = () => {
    const { data: user } = useGetUserByTokenQuery()
    const { data: specialties, isLoading } = useGetAllSpecialtiesQuery('')
    const [tableData, setTableData] = useState<any>({
        ФИО: null,
        'E-mail': null,
        'Номер студенческого билета': null,
        Специальность: null,
        Курс: null,
    })
    const UNDEFINED_PLACEHOLDER = '--/--'

    const loading = !user || !specialties || isLoading

    useEffect(() => {
        if (user && specialties) {
            setTableData({
                ФИО: user.userName,
                'E-mail': user.email,
                'Номер студенческого билета': user.studentId,
                Специальность: specialties.find(
                    (specialty) => specialty.id === user.specialtyId
                )?.name,
                Курс: user.course,
            })
        }
    }, [user, specialties])

    if (loading) return <AppCircleLoader />

    return (
        <>
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
                Профиль {user.userName}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container>
                {Object.keys(tableData).map((key, i) => (
                    <Grid
                        component={motion.div}
                        container
                        item
                        key={key}
                        xs={12}
                        sx={{ overflow: 'hidden' }}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Grid item xs={6}>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ fontWeight: 700 }}
                            >
                                {key}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ fontWeight: 400 }}
                            >
                                {tableData[key] || UNDEFINED_PLACEHOLDER}
                            </Typography>
                        </Grid>
                        <Divider sx={{ width: '100%', my: 2 }} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Profile
