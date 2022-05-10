import { Button, Container, TextField, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { userSlice } from 'store/reducers/userReducer'
import classes from './Auth.module.scss'
import logo from 'static/logo.png'

const Auth: FC = () => {
    const { auth } = useAppSelector((state) => state.user)
    const { login } = userSlice.actions
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const loginHandler = () => {
        dispatch(login({ email: 'Oskar', role: 'Admin' }))
    }

    if (auth) return <Navigate to="/" />

    return (
        <div className={classes.auth}>
            <Container>
                <div className={classes.inner}>
                    <motion.form
                        onSubmit={handleSubmit(loginHandler)}
                        action="/"
                        className={classes.form}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <img src={logo} alt="" />
                        <div className={classes.content}>
                            <Typography className={classes.title} variant="h4">
                                Авторизация
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Логин (E-mail)"
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Поле должно быть заполнено',
                                    },
                                })}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Пароль"
                                error={!!errors.password}
                                helperText={errors?.password?.message}
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Поле должно быть заполнено',
                                    },
                                })}
                            />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                            >
                                Авторизоваться
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </Container>
        </div>
    )
}

export default Auth
