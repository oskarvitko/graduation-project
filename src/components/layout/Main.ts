import { styled } from '@mui/material'

export const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'auth',
})<{
    open?: boolean
    auth?: boolean
}>(({ theme, open, auth }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(7),
    minHeight: 'calc(100vh - 56px)',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: auth ? 56 : 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: '200px',
    }),
}))
