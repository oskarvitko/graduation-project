import { Button, Grid, LinearProgress, makeStyles, Paper, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useValidation } from '../../hooks/validation-hook'
// import { registration } from '../../redux/actions/auth-actions'
import styles from './Form.style'

const RegisterForm = ({ changeForm }) => {
    const classes = makeStyles(styles)()
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
    const [form, setForm] = useState({})
    const [errors, validate, rule] = useValidation(form)
    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const changeHandler = (event) =>
        setForm({ ...form, [event.target.name]: event.target.value })

    const submitHandler = () => {
        if (formIsValid()) {
            // dispatch(registration({
            //     login: form.login,
            //     password: form.password,
            //     name: form.name,
            //     surname: form.surname
            // }))
        }
    }

    const formIsValid = () =>
        validate([
            rule('login').isRequired('Обязательное поле').result,
            rule('name').isRequired('Обязательное поле').minLength(2, 'Минимум 2 символа').result,
            rule('surname').isRequired('Обязательное поле').minLength(2, 'Минимум 2 символа').result,
            rule('password').isRequired('Обязательное поле').minLength(4, 'Минимум 4 символа').result,
            rule('confirmedPassword').isEqual(form['password'], 'Пароли не совпадают').result,
        ])

    return (
        <Paper className={classes.paper}>
            <Typography
                variant='h5'
                align='center'
                className={classes.header}
            >
                Регистрация
            </Typography>
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

                    name='login'
                    value={form.login || ''}
                    onChange={changeHandler}
                    error={!!errors.login}
                    helperText={errors.login}
                />
                <TextField
                    variant='outlined'
                    label='Имя'
                    size={isSmallScreen ? 'small' : 'medium'}

                    name='name'
                    value={form.name || ''}
                    onChange={changeHandler}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    variant='outlined'
                    label='Фамилия'
                    size={isSmallScreen ? 'small' : 'medium'}

                    name='surname'
                    value={form.surname || ''}
                    onChange={changeHandler}
                    error={!!errors.surname}
                    helperText={errors.surname}
                />
                <TextField
                    type='password'
                    variant='outlined'
                    label='Пароль'
                    size={isSmallScreen ? 'small' : 'medium'}

                    name='password'
                    value={form.password || ''}
                    onChange={changeHandler}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    type='password'
                    variant='outlined'
                    label='Повторите пароль'
                    size={isSmallScreen ? 'small' : 'medium'}

                    name='confirmedPassword'
                    value={form.confirmedPassword || ''}
                    onChange={changeHandler}
                    error={!!errors.confirmedPassword}
                    helperText={errors.confirmedPassword}
                />
                <Button
                    variant='contained'
                    color='primary'
                    size={isSmallScreen ? 'medium' : 'large'}
                    onClick={submitHandler}
                    disabled={isLoading}
                >
                    Зарегистрироваться
                </Button>
                <Button
                    variant='text'
                    color='primary'
                    onClick={changeForm}
                    className={classes.changeFormButton}
                    disabled={isLoading}
                >
                    Авторизация
                </Button>
            </Grid>
        </Paper>
    )
}

export default RegisterForm