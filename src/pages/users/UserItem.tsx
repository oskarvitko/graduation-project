import { Delete, Lock, LockOpen, Person, Shield } from '@mui/icons-material'
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
} from '@mui/material'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import {
    useBlockUserMutation,
    useDeleteUserMutation,
    useUnblockMutation,
} from 'api/userApi'
import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'
import useRole from 'hook/useRole'
import { IUser } from 'models/IUser'
import React, { useEffect, useState } from 'react'
import { ROLES } from '../../constants'

type UserItemProps = {
    user: IUser
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    const { hasRole } = useRole()

    const [blockUser] = useBlockUserMutation()
    const [unblockUser] = useUnblockMutation()
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false)
    const { data: specialties } = useGetAllSpecialtiesQuery('')
    const [deleteUser] = useDeleteUserMutation()

    const [canBlock, setCanBlock] = useState(false)

    useEffect(() => {
        switch (user.role) {
            case ROLES.MODERATOR:
                if (hasRole(ROLES.ADMIN)) {
                    setCanBlock(true)
                }
                break
            case ROLES.TEACHER:
                setCanBlock(true)
                break
            case ROLES.STUDENT:
                setCanBlock(true)
                break
        }
    }, [])

    const blockClickHandler = async () => {
        user.isBlocked ? await unblockUser(user.id) : await blockUser(user.id)
        onClose()
    }

    const onClose = () => setConfirmDialog(false)
    const onDeleteClose = () => setDeleteConfirmDialog(false)

    const deleteClickHandler = () => {
        deleteUser(user.id)
        onDeleteClose()
    }

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {(user.role === ROLES.STUDENT ||
                            user.role === ROLES.TEACHER) && <Person />}
                        {user.role === ROLES.MODERATOR && <Shield />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.userName}
                    secondary={`${user.email}${
                        user.specialtyId
                            ? ` - ${
                                  specialties?.find(
                                      (item) => item.id === user.specialtyId
                                  )?.name
                              }`
                            : ''
                    }`}
                />
                {canBlock && (
                    <Tooltip
                        title={
                            user.isBlocked ? 'Разблокировать' : 'Заблокировать'
                        }
                    >
                        <IconButton onClick={() => setConfirmDialog(true)}>
                            {user.isBlocked ? (
                                <Lock color="primary" />
                            ) : (
                                <LockOpen />
                            )}
                        </IconButton>
                    </Tooltip>
                )}
                {hasRole(ROLES.ADMIN) && (
                    <Tooltip title={'Удалить'}>
                        <IconButton
                            onClick={() => setDeleteConfirmDialog(true)}
                        >
                            <Delete color="primary" />
                        </IconButton>
                    </Tooltip>
                )}
            </ListItem>
            <ConfirmDialog
                text={`Вы уверены что хотите ${
                    user.isBlocked ? 'разблокировать' : 'заблокировать'
                } пользователя ${user.email}?`}
                open={confirmDialog}
                onClose={onClose}
                onCancel={onClose}
                onAccept={blockClickHandler}
            />
            <ConfirmDialog
                text={`Вы уверены что хотите удалить пользователя ${user.email}?`}
                open={deleteConfirmDialog}
                onClose={onDeleteClose}
                onCancel={onDeleteClose}
                onAccept={deleteClickHandler}
            />
        </>
    )
}

export default UserItem
