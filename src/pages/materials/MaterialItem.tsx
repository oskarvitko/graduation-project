import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import { Grid, ListItem, Paper, Rating } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMaterial } from 'structures/IMaterial'
import { modeType } from './Materials'

type MaterialItemProps = {
    item: IMaterial
    mode: modeType
}

const MaterialItem: React.FC<MaterialItemProps> = ({ item }) => {
    const navigate = useNavigate()

    const onClick = () => navigate(`/material/${item.id}`)

    return (
        <ListItem sx={{ p: 0, my: 2 }} button onClick={onClick}>
            <Paper elevation={2} sx={{ borderRadius: 0, p: 2, width: '100%' }}>
                <Grid
                    container
                    alignItems={'center'}
                    justifyContent="space-between"
                >
                    <Grid item xs={'auto'}>
                        {item.name}
                    </Grid>
                    <Grid item xs={'auto'}>
                        {item.bookmark?.isBookmark ? (
                            <Bookmark color="primary" />
                        ) : (
                            <BookmarkBorder color="primary" />
                        )}
                    </Grid>
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
    )
}

export default MaterialItem
