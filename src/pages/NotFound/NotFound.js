import { Button, Container, styled, Typography, useTheme, withTheme } from '@material-ui/core'
import { A } from 'hookrouter'
import React from 'react'

const StyledText = styled(withTheme(Typography))(props => ({
    textShadow: '1px 1px 1px #000',
    margin: '1.6em 0',
    fontWeight: '500',
    fontSize: '3.75rem',
    '& span': {
        color: props.theme.palette.primary.main,
        fontWeight: 700,
    },
    [props.theme.breakpoints.down('md')]: {
        fontSize: '3rem'
    },
    [props.theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem'
    },
    [props.theme.breakpoints.down('xs')]: {
        fontSize: '2rem'
    },
}))

const StyledLink = styled(A)({
    textDecoration: 'none',
})

const StyledContainer = styled(Container)({
    textAlign: 'center'
})

const NotFound = () => {
    console.log(useTheme())

    return (
        <StyledContainer>
            <StyledText component="h1" >Страница не найдена <span>404!</span></StyledText>
            <StyledLink href='/home'>
                <Button
                    variant='contained'
                    color='primary'
                >
                    На главную
                </Button>
            </StyledLink>
        </StyledContainer>
    )
}

export default NotFound