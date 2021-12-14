import { Button, Container, FormControl, Grid, List, ListItem, Paper, TextField, Typography } from '@material-ui/core'
import { Bookmark, BookmarkBorderOutlined } from '@material-ui/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBackdrop from '../../components/AppBackdrop/AppBackdrop'
import MaterialsList from '../../components/MaterialsList/MaterialsList'
import { delay } from '../../http'
import { auth } from '../../redux/actions/auth-actions'

const Home = () => {
    const [isLoading, setLoading] = useState(true)

    const {
        materials
    } = useSelector(state => state.material)

    useEffect(async () => {
        await delay(300)
        setLoading(false)
    }, [])

    if (isLoading) return <AppBackdrop style={{ backgroundColor: '#fff' }} open={true} />

    return (
        <Container>
            <Typography variant='h5' style={{ fontWeight: 700, textAlign: 'center' }}>Самые популярные материалы</Typography>
            <MaterialsList materials={materials.sort((first, second) => second.watched - first.watched).slice(0, 6)} />
        </Container>
    )
}

export default Home