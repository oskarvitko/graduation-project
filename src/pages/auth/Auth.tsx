import {
    Button,
    CircularProgress,
    SelectChangeEvent,
    Typography,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { FC, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { userSlice } from 'store/reducers/userReducer'
import classes from './Auth.module.scss'
import logo from 'static/logo.png'
import {
    useLazyGetUserByTokenQuery,
    useLoginMutation,
    useRegistrateStudentMutation,
} from 'api/userApi'
import { createTextInput } from './TextInput'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'

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
            data: loginData,
            isSuccess: loginSucces,
        },
    ] = useLoginMutation()
    const [
        fetchRegistrate,
        {
            isLoading: registrateLoading,
            error: registrateError,
            data: registrateData,
            isSuccess: registrateSuccess,
        },
    ] = useRegistrateStudentMutation()
    const { data: specialties, isSuccess: specialtiesLoaded } =
        useGetAllSpecialtiesQuery('')
    const [getUserByToken, { isLoading: userLoading }] =
        useLazyGetUserByTokenQuery()

    const [course, setCourse] = useState(1)
    const [specialty, setSpecialty] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [registrationMode, setRegistrationMode] = useState(false)

    const isLoading = loginLoading || registrateLoading || userLoading
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

    const authenticate = async (token: string) => {
        localStorage.setItem('token', token)
        await getUserByToken(token)
        dispatch(login(token))
    }

    const loginHandler = useCallback(async () => {
        if (loginSucces && loginData?.token) authenticate(loginData.token)

        if (loginError && 'status' in loginError) {
            if (loginError.status === 401) {
                setErrorMessage('???????????????? E-mail ?????? ????????????!')
            }
        }
    }, [loginError, loginSucces])

    const registrationHandler = useCallback(async () => {
        if (registrateSuccess && registrateData?.token)
            authenticate(registrateData.token)

        if (registrateError && 'status' in registrateError) {
            if (registrateError.status === 422) {
                setErrorMessage('?????????? E-mail ?????? ?????? ?????? ????????????????????!')
            }
        }
    }, [registrateError, registrateSuccess])

    useEffect(() => {
        registrationHandler()
    }, [registrationHandler])

    useEffect(() => {
        loginHandler()
    }, [loginHandler])

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
            specialtyId: specialty,
        })
    }

    if (!specialtiesLoaded) return <AppCircleLoader />

    return (
        <div className={classes.auth}>
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
                            {!registrationMode ? '??????????????????????' : '??????????????????????'}
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
                            label="?????????? (E-mail)"
                            validation={{
                                required: {
                                    value: true,
                                    message: '???????? ???????????? ???????? ??????????????????',
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        '???????????????????? ?????????????? E-mail ?? ?????????????? "user@example.com"',
                                },
                            }}
                        />
                        <TextInput
                            name="password"
                            label="????????????"
                            type="password"
                            validation={{
                                required: {
                                    value: true,
                                    message: '???????? ???????????? ???????? ??????????????????',
                                },
                                maxLength: {
                                    value: 40,
                                    message:
                                        '???????????????????????? ?????????? ???????? 40 ????????????????',
                                },
                            }}
                        />
                        <AnimatePresence>
                            {registrationMode && (
                                <motion.div {...textFieldAnimationProps}>
                                    <TextInput
                                        name="userName"
                                        label="??????"
                                        validation={{
                                            required: {
                                                value: true,
                                                message:
                                                    '???????? ???????????? ???????? ??????????????????',
                                            },
                                        }}
                                    />
                                    <TextInput
                                        name="studentId"
                                        label="??? ?????????????????????????? ????????????"
                                        type="number"
                                        validation={{
                                            required: {
                                                value: true,
                                                message:
                                                    '???????? ???????????? ???????? ??????????????????',
                                            },
                                            minLength: {
                                                value: 10,
                                                message:
                                                    '?????????????????????? ?????????? ???????? 10 ??????????????????',
                                            },
                                            maxLength: {
                                                value: 20,
                                                message:
                                                    '???????????????????????? ?????????? ???????? 20 ????????????????',
                                            },
                                        }}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="course-label">
                                            ????????
                                        </InputLabel>
                                        <Select
                                            size={size}
                                            fullWidth
                                            labelId="course-label"
                                            id="course-select"
                                            value={course.toString()}
                                            label="????????"
                                            onChange={(e: SelectChangeEvent) =>
                                                setCourse(
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            <MenuItem value={'1'}>1</MenuItem>
                                            <MenuItem value={'2'}>2</MenuItem>
                                            <MenuItem value={'3'}>3</MenuItem>
                                            <MenuItem value={'4'}>4</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {specialties && specialty && (
                                        <FormControl fullWidth>
                                            <InputLabel id="specialty-label">
                                                ??????????????????????????
                                            </InputLabel>
                                            <Select
                                                size={size}
                                                fullWidth
                                                labelId="specialty-label"
                                                id="specialty-select"
                                                value={specialty}
                                                label="??????????????????????????"
                                                onChange={(
                                                    e: SelectChangeEvent
                                                ) =>
                                                    setSpecialty(e.target.value)
                                                }
                                            >
                                                {specialties.map(
                                                    (specialty: any) => (
                                                        <MenuItem
                                                            key={specialty.id}
                                                            value={specialty.id}
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
                                ????????????????????????????????????
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
                                ????????????????????????????
                            </Button>
                        )}
                        <Button
                            disabled={isLoading}
                            size="large"
                            variant="outlined"
                            onClick={toggleRegistrationMode}
                        >
                            {registrationMode ? '??????????????????????' : '??????????????????????'}
                        </Button>
                    </div>
                </motion.form>
            </div>
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
