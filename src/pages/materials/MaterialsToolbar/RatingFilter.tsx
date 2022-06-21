import { Grid, Rating, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { filterSlice } from 'store/reducers/filterReducer'

const RatingFilter = () => {
    const { rating } = useAppSelector((state) => state.filter)
    const dispatch = useAppDispatch()
    const { setRating } = filterSlice.actions

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography sx={{ fontSize: 14 }}>
                    Рейтинг {!!rating && `от: ${rating}`}
                </Typography>
            </Grid>
            <Grid item>
                <Rating
                    max={10}
                    value={rating}
                    onChange={(event, newValue) =>
                        dispatch(setRating(newValue || 0))
                    }
                />
            </Grid>
        </Grid>
    )
}

export default RatingFilter
