import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import styles from './Auth.style'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = () => {
    const classes = makeStyles(styles)()
    const [isLogin, setIsLogin] = useState(true)

    const changeForm = () => setIsLogin(prev => !prev)

    return (
        <Box className={classes.page}>
            <Container className={classes.container}>
                <Typography variant='h2' align='center' className={classes.title}>Universe Library</Typography>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {isLogin ?
                        <LoginForm
                            changeForm={changeForm}
                        /> :
                        <RegisterForm
                            changeForm={changeForm}
                        />}
                </Grid>
            </Container>
        </Box>
    )
}

export default Auth