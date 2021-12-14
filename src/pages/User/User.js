import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../../redux/actions/auth-actions'

const User = () => {
    const { user, users, storage } = useSelector(state => state.auth)
    const { materials } = useSelector(state => state.material)
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        name: '',
        surname: ''
    })
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (user) {
            setInputs({
                name: user.username,
                surname: user.surname
            })
        }
    }, [user])

    const changeHandler = (event) => {
        if (disabled) {
            setDisabled(false)
        }
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const saveHandler = () => {
        const index = users.indexOf(user)
        if (index >= 0) {
            dispatch(setUsers(users.map((item, i) => {
                if (i === index) {
                    return {
                        ...user,
                        username: inputs.name,
                        surname: inputs.surname
                    }
                }

                return item
            })))
            storage.setItem('username', inputs.name)
        }
        setDisabled(true)
    }

    return (
        <Container>
            <Paper elevation='3' style={{ padding: 16, width: 536, borderRadius: 0, margin: '0 auto' }}>
                <Typography variant='h5' style={{ fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>Страница пользователя</Typography>
                <Grid container style={{ fontSize: 16 }}>
                    <Grid item xs={7}>
                        <div style={{ fontWeight: 500, marign: 10 }}>Логин:</div>
                        <div style={{ fontWeight: 500, marign: 10 }}>Количество материалов в избранном:</div>
                        <div style={{ fontWeight: 500, marign: 10 }}>Количество скачанных материалов:</div>
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: 16 }}>
                        <div style={{ marign: 10 }}>{user?.login}</div>
                        <div style={{ marign: 10 }}>{materials.filter(material => material.isBookmark).length}</div>
                        <div style={{ marign: 10 }}>{user?.downloaded}</div>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Grid item xs={12}>
                        <TextField
                            onChange={changeHandler}
                            variant='outlined'
                            label='Имя'
                            name='name'
                            value={inputs.name}
                            style={{ marginTop: 15, width: '100%' }}
                        />
                        <TextField
                            onChange={changeHandler}
                            variant='outlined'
                            label='Фамилия'
                            name='surname'
                            value={inputs.surname}
                            style={{ marginTop: 15, width: '100%' }}
                        />
                        <Button disabled={disabled} onClick={saveHandler} style={{ marginTop: 15, width: '100%' }} color='primary' variant='contained'>Сохранить</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default User