import {
    Button,
    CircularProgress,
    Container,
    SelectChangeEvent,
    Typography,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { userSlice } from 'store/reducers/userReducer'
import classes from './Auth.module.scss'
import logo from 'static/logo.png'
import { parseJwt } from 'util/jwt'
import { useLoginMutation, useRegistrateStudentMutation } from 'api/userApi'
import { createTextInput } from './TextInput'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import AppLoader from 'components/appLoader/appLoader'
import { ROLES } from '../../constants'

const Auth: FC = () => {
    const navigate = useNavigate()
    const location: any = useLocation()
    const { auth } = useAppSelector((state) => state.user)
    const { login } = userSlice.actions
    const dispatch = useAppDispatch()
    const [
        fetchLogin,
        {
            isLoading: loginLoading,
            error: loginError,
            data: token,
            isSuccess: loginSucces,
        },
    ] = useLoginMutation()
    const [
        fetchRegistrate,
        {
            isLoading: registrateLoading,
            error: registrateError,
            data: info,
            isSuccess: registrateSuccess,
        },
    ] = useRegistrateStudentMutation()
    const {
        data: specialties,
        isLoading: specialtiesLoading,
        isSuccess: specialtiesLoaded,
    } = useGetAllSpecialtiesQuery('')

    const [course, setCourse] = useState(1)
    const [specialty, setSpecialty] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [registrationMode, setRegistrationMode] = useState(false)

    const isLoading = loginLoading || registrateLoading
    const size = registrationMode ? 'small' : 'medium'

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
        if (specialties) {
            setSpecialty(specialties[0].id)
        }
    }, [specialtiesLoaded])

    useEffect(() => {
        if (auth) {
            const to = location?.state?.from
                ? location.state.from.pathname
                : '/'
            navigate(to, { replace: true })
        }
    }, [auth])

    useEffect(() => {
        if (loginSucces && token) {
            const { email, role } = parseJwt(token)
            dispatch(login({ email, role }))
            localStorage.setItem('token', token)
        }
        if (loginError && 'status' in loginError) {
            if (loginError.status === 401) {
                setErrorMessage('Неверный E-mail или пароль!')
            }
        }
    }, [loginError, loginSucces])

    const TextInput = createTextInput(register, isLoading, errors, size)

    const toggleRegistrationMode = () => {
        setRegistrationMode((prev) => !prev)
        setErrorMessage('')
    }

    const submitHandler = async (data: any) => {
        setErrorMessage('')
        if (!registrationMode)
            return fetchLogin({
                email: data.email,
                password: data.password,
            })

        fetchRegistrate({
            ...data,
            course,
            spesialtyId: specialty,
        })
    }

    if (specialtiesLoading) return <AppLoader />

    return (
        <div className={classes.auth}>
            <Container>
                <div className={classes.inner}>
                    <motion.form
                        onSubmit={handleSubmit(submitHandler)}
                        action="/"
                        className={classes.form}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                    >
                        <img src={logo} alt="" />
                        <div className={classes.content}>
                            <Typography className={classes.title} variant="h4">
                                {!registrationMode
                                    ? 'Авторизация'
                                    : 'Регистрация'}
                            </Typography>
                            <AnimatePresence>
                                {errorMessage && (
                                    <motion.h4
                                        className={classes.errorMessage}
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0, overflow: 'hidden' }}
                                    >
                                        {errorMessage}
                                    </motion.h4>
                                )}
                            </AnimatePresence>
                            <TextInput
                                name="email"
                                label="Логин (E-mail)"
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Поле должно быть заполнено',
                                    },
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message:
                                            'Пожалуйста введите E-mail в формате "user@example.com"',
                                    },
                                }}
                            />
                            <TextInput
                                name="password"
                                label="Пароль"
                                type="password"
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Поле должно быть заполнено',
                                    },
                                    maxLength: {
                                        value: 40,
                                        message:
                                            'Максимальная длина поля 40 символов',
                                    },
                                }}
                            />
                            <AnimatePresence>
                                {registrationMode && (
                                    <motion.div {...textFieldAnimationProps}>
                                        <TextInput
                                            name="userName"
                                            label="ФИО"
                                            validation={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Поле должно быть заполнено',
                                                },
                                            }}
                                        />
                                        <TextInput
                                            name="studentId"
                                            label="№ студенческого билета"
                                            type="number"
                                            validation={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Поле должно быть заполнено',
                                                },
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        'Минимальная длина поля 10 симоволов',
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message:
                                                        'Максимальная длина поля 20 символов',
                                                },
                                            }}
                                        />
                                        <FormControl fullWidth>
                                            <InputLabel id="course-label">
                                                Курс
                                            </InputLabel>
                                            <Select
                                                size={size}
                                                fullWidth
                                                labelId="course-label"
                                                id="course-select"
                                                value={course.toString()}
                                                label="Курс"
                                                onChange={(
                                                    e: SelectChangeEvent
                                                ) =>
                                                    setCourse(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            >
                                                <MenuItem value={'1'}>
                                                    1
                                                </MenuItem>
                                                <MenuItem value={'2'}>
                                                    2
                                                </MenuItem>
                                                <MenuItem value={'3'}>
                                                    3
                                                </MenuItem>
                                                <MenuItem value={'4'}>
                                                    4
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        {specialties && specialty && (
                                            <FormControl fullWidth>
                                                <InputLabel id="specialty-label">
                                                    Специальность
                                                </InputLabel>
                                                <Select
                                                    size={size}
                                                    fullWidth
                                                    labelId="specialty-label"
                                                    id="specialty-select"
                                                    value={specialty}
                                                    label="Специальность"
                                                    onChange={(
                                                        e: SelectChangeEvent
                                                    ) =>
                                                        setSpecialty(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {specialties.map(
                                                        (specialty: any) => (
                                                            <MenuItem
                                                                key={
                                                                    specialty.id
                                                                }
                                                                value={
                                                                    specialty.id
                                                                }
                                                            >
                                                                {specialty.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {registrationMode ? (
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <CircularProgress
                                            color="primary"
                                            size={20}
                                            thickness={6}
                                            sx={{ mr: 1 }}
                                        />
                                    )}
                                    Зарегистрироваться
                                </Button>
                            ) : (
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <CircularProgress
                                            color="primary"
                                            size={20}
                                            thickness={6}
                                            sx={{ mr: 1 }}
                                        />
                                    )}
                                    Авторизоваться
                                </Button>
                            )}
                            <Button
                                disabled={isLoading}
                                size="large"
                                variant="outlined"
                                onClick={toggleRegistrationMode}
                            >
                                {registrationMode
                                    ? 'Авторизация'
                                    : 'Регистрация'}
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </Container>
        </div>
    )
}

export default Auth

const textFieldAnimationProps = {
    className: classes.registrationContainer,
    initial: {
        height: 0,
    },
    animate: { height: 'auto' },
    exit: {
        height: 0,
    },
    transition: { type: 'tween' },
}
