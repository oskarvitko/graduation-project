import { Divider, Grid, List, Typography } from '@mui/material'
import {
    useCreateEmployeeMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useGetUserByTokenQuery,
} from 'api/userApi'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import useRole from 'hook/useRole'
import { IUser } from 'models/IUser'
import React, { useEffect, useState } from 'react'
import { ROLES } from '../../constants'
import UserEditMenu from './UserEditMenu'
import UserItem from './UserItem'

const Users = () => {
    const { data: user } = useGetUserByTokenQuery()
    const { data: users, isLoading: usersLoading } = useGetAllUsersQuery(
        user?.id || ''
    )
    const { hasRole } = useRole()

    const deleteLoading = useDeleteUserMutation()[1].isLoading
    const employeeLoading = useCreateEmployeeMutation()[1].isLoading

    const loading = deleteLoading || employeeLoading

    const [moderators, setModerators] = useState<IUser[]>([])
    const [teachers, setTeachers] = useState<IUser[]>([])
    const [students, setStudents] = useState<IUser[]>([])

    useEffect(() => {
        if (users) {
            const moderators: IUser[] = []
            const teachers: IUser[] = []
            const students: IUser[] = []

            users.forEach((user) => {
                if (user.role === ROLES.MODERATOR) moderators.push(user)
                if (user.role === ROLES.TEACHER) teachers.push(user)
                if (user.role === ROLES.STUDENT) students.push(user)
            })

            setModerators(moderators)
            setTeachers(teachers)
            setStudents(students)
        }
    }, [users])

    if (usersLoading) return <AppCircleLoader size={50} />

    return (
        <>
            <Typography variant="h6">Управление пользователями</Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container>
                <Grid item xs={6} container direction="column">
                    <Grid item>
                        <Typography sx={sectionTitleSX}>Модераторы:</Typography>
                        {hasRole(ROLES.ADMIN) && (
                            <UserEditMenu createMode employeeType="moderator" />
                        )}
                        <List>
                            {moderators.map((user) => (
                                <UserItem user={user} key={user.id} />
                            ))}
                        </List>
                    </Grid>
                    <Grid item>
                        <Typography sx={sectionTitleSX}>
                            Преподаватели:
                        </Typography>
                        {hasRole(ROLES.ADMIN) && (
                            <UserEditMenu createMode employeeType="teacher" />
                        )}
                        <List>
                            {teachers.map((user) => (
                                <UserItem user={user} key={user.id} />
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={sectionTitleSX}>Студенты:</Typography>
                    <List>
                        {students.map((user) => (
                            <UserItem user={user} key={user.id} />
                        ))}
                    </List>
                </Grid>
            </Grid>
            {loading && (
                <AppCircleLoader
                    color={'primary'}
                    invizible={false}
                    size={50}
                />
            )}
        </>
    )
}

export default Users

const sectionTitleSX = {
    fontSize: 14,
    fontWeight: 500,
    mb: 1,
    color: 'var(--color-primary)',
}
