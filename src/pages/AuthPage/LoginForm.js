import React, { useEffect, useState } from 'react'
import styles from './Form.style'
import { Button, Checkbox, FormControlLabel, Grid, LinearProgress, makeStyles, Paper, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useValidation } from '../../hooks/validation-hook'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth-actions'

const LoginForm = ({ changeForm }) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
    const classes = makeStyles(styles)()
    const [form, setForm] = useState({
        rememberPassword: false
    })
    const [errors, validate, rule] = useValidation(form)
    const [error, setError] = useState(null)
    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const changeHandler = (event) => {
        const field = { [event.target.name]: event.target.value }
        if (event.target.type === 'checkbox') field[event.target.name] = event.target.checked

        setForm({
            ...form,
            ...field
        })
    }

    const submitHandler = async () => {
        if (formIsValid()) {
            const response = await dispatch(login(form.login, form.password))
            if (response.status === 200) {
                if (form.rememberPassword) {
                    localStorage.setItem('storage', 'local')
                } else {
                    localStorage.removeItem('storage')
                }
            } else {
                setError(response.data.errorText)
            }
        }
    }

    const formIsValid = () =>
        validate([
            rule('login').isRequired('Обязательное поле').result,
            rule('password').isRequired('Обязательное поле').result,
        ])

    const onKeyPress = (event) => event.code === 'Enter' && submitHandler()

    return (
        <Paper className={classes.paper}>
            <Typography
                variant='h5'
                align='center'
                className={classes.header}
            >
                Авторизация
            </Typography>
            {error && <Typography className={classes.error} variant='body1'>{error}</Typography>}
            {isLoading && <LinearProgress color='primary' />}
            <Grid
                container
                direction='column'
                className={classes.grid}
            >
                <TextField
                    variant='outlined'
                    label='Логин'
                    size={isSmallScreen ? 'small' : 'medium'}

                    name={'login'}
                    value={form.login || ''}
                    onChange={changeHandler}
                    error={!!errors.login}
                    helperText={errors.login}
                />
                <TextField
                    type='password'
                    variant='outlined'
                    label='Пароль'
                    size={isSmallScreen ? 'small' : 'medium'}

                    name={'password'}
                    value={form.password || ''}
                    onChange={changeHandler}
                    error={!!errors.password}
                    helperText={errors.password}
                    onKeyPress={onKeyPress}
                />
                <FormControlLabel
                    control={<Checkbox color="primary" />}
                    checked={form.rememberPassword}
                    label='Запомнить пароль'
                    name={'rememberPassword'}
                    onChange={changeHandler}
                />
                <Button
                    variant='contained'
                    color='primary'
                    size={isSmallScreen ? 'medium' : 'large'}
                    onClick={submitHandler}
                    disabled={isLoading}
                >
                    Войти
                </Button>
                <Button
                    variant='text'
                    color='primary'
                    onClick={changeForm}
                    className={classes.changeFormButton}
                    disabled={isLoading}
                >
                    Регистрация
                </Button>
            </Grid>
        </Paper>
    )
}

export default LoginForm