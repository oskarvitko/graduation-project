import {
    Bookmark,
    BookmarkBorder,
    Star,
    StarBorder,
    StarBorderPurple500,
} from '@mui/icons-material'
import { Grid, ListItem, Paper } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { IMaterial } from 'structures/IMaterial'

type MaterialItemProps = {
    item: IMaterial
}

const MaterialItem: React.FC<MaterialItemProps> = ({ item }) => {
    const ratingNumber = item.materialRating?.averageRating || 0

    const ratingArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    Array.from(Array(Math.round(ratingNumber * 10)).keys()).forEach(
        (number, i, arr) => {
            if (number % 10 === 0) {
                ratingArray[number / 10] = 2
            }
            if (arr.length - 1 === i && number % 10 !== 0) {
                ratingArray[Math.floor(number / 10)] = 1
            }
        }
    )

    return (
        <ListItem sx={{ p: 0, my: 2 }} button>
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
                        {item.bookmark ? (
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
                        {ratingArray.map((number) => {
                            if (number === 2)
                                return (
                                    <Star fontSize={'small'} color="primary" />
                                )
                            if (number === 1)
                                return (
                                    <StarBorderPurple500
                                        fontSize={'small'}
                                        color="primary"
                                    />
                                )
                            return (
                                <StarBorder
                                    fontSize={'small'}
                                    color="primary"
                                />
                            )
                        })}
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
