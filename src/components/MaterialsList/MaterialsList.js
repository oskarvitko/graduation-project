import { Button, Grid, List, ListItem, Paper } from '@material-ui/core'
import { Bookmark, BookmarkBorderOutlined } from '@material-ui/icons'
import { navigate } from 'hookrouter'
import React from 'react'

const MaterialsList = (props) => {
    const {
        materials = []
    } = props

    const detailsHandler = (id) => () => navigate(`/material/${id}`)

    return (
        <List>
            {materials
                .map(item => (
                    <ListItem key={item.id} style={{ marginTop: 16, padding: 0 }}>
                        <Paper elevation={3} style={{ padding: 8, width: '100%', borderRadius: 0 }}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <b>{item.title}</b><br />
                                    <b>Дисциплина: </b> {item.subject}<br />
                                    <b>Автор: </b> {item.author}<br /><br />

                                    <span>Просмотров: </span>{item.watched} <span>Скачиваний: </span>{item.downloaded}
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container direction='column' alignItems='flex-end' justifyContent='space-between' style={{ height: '100%' }}>
                                        <Grid item>
                                            {item.isBookmark ? <Bookmark color='primary' /> : <BookmarkBorderOutlined color='primary' />}
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={detailsHandler(item.id)} variant='contained' color='primary' style={{ borderRadius: 0 }}>
                                                Подробнее
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </ListItem>
                ))}
        </List>
    )
}

export default MaterialsList