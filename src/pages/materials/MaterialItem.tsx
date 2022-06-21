import { Bookmark, BookmarkBorder, Delete } from '@mui/icons-material'
import {
    Button,
    Grid,
    IconButton,
    ListItem,
    Paper,
    Rating,
    Tooltip,
} from '@mui/material'
import PrivateBlock from 'components/privateBlock/PrivateBlock'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMaterial } from 'structures/IMaterial'
import { modeType } from './Materials'
import { ROLES } from '../../constants'
import { materialsSlice } from 'store/reducers/materialsReducer'
import { useAppDispatch } from 'hook/redux'
import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'
import { useDeleteMaterialByIdMutation } from 'api/materialApi'

type MaterialItemProps = {
    item: IMaterial
    mode: modeType
}

const MaterialItem: React.FC<MaterialItemProps> = ({ item }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { openDialog, setEditedMaterial } = materialsSlice.actions

    const [deleteMaterial] = useDeleteMaterialByIdMutation()

    const [confirmDialog, setConfirmDialog] = useState(false)

    const onClick = () => navigate(`/material/${item.id}`)

    const editClickHandler = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        dispatch(openDialog(false))
        dispatch(setEditedMaterial(item))
    }

    const deleteClickHandler = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        setConfirmDialog(true)
    }

    const deleteHandler = async () => {
        await deleteMaterial(item.id.toString())
        onClose()
    }

    const onClose = () => setConfirmDialog(false)

    return (
        <>
            <ListItem sx={{ p: 0, my: 2 }} button onClick={onClick}>
                <Paper
                    elevation={2}
                    sx={{ borderRadius: 0, p: 2, width: '100%' }}
                >
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item xs={'auto'} sx={{ mr: 'auto' }}>
                            {item.name}
                        </Grid>

                        <PrivateBlock roles={[ROLES.TEACHER, ROLES.MODERATOR]}>
                            <Grid item xs={'auto'}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={editClickHandler}
                                >
                                    Редактировать
                                </Button>
                            </Grid>
                        </PrivateBlock>
                        <PrivateBlock roles={[ROLES.TEACHER, ROLES.MODERATOR]}>
                            <Grid item xs={'auto'}>
                                <Tooltip title="Удалить материал">
                                    <IconButton onClick={deleteClickHandler}>
                                        <Delete color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </PrivateBlock>
                        <PrivateBlock roles={[ROLES.STUDENT]}>
                            <Grid item xs={'auto'}>
                                {item.bookmark?.isBookmark ? (
                                    <Bookmark color="primary" />
                                ) : (
                                    <BookmarkBorder color="primary" />
                                )}
                            </Grid>
                        </PrivateBlock>
                    </Grid>
                    <Grid
                        container
                        sx={{ mt: 2 }}
                        alignItems={'flex-end'}
                        justifyContent="space-between"
                    >
                        <Grid item xs={6} sx={{ mb: -1 }}>
                            <Rating
                                value={item.materialRating?.averageRating || 0}
                                max={10}
                                readOnly
                            />
                        </Grid>
                        <Grid item xs={'auto'}>
                            {item.materialType}
                        </Grid>
                        <Grid item xs={'auto'}>
                            {moment(item.createDate).format('DD.MM.yyyy HH:mm')}
                        </Grid>
                    </Grid>
                </Paper>
            </ListItem>
            <ConfirmDialog
                onClose={onClose}
                onCancel={onClose}
                onAccept={deleteHandler}
                open={confirmDialog}
                text={`Вы уверены, что хотите удалить материал "${item.name}"?`}
            />
        </>
    )
}

export default MaterialItem
