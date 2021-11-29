import bg from './img/bg.jpg'

const styles = (theme) => ({
    title: {
        marginBottom: '1em',
        color: '#fff',
        fontWeight: '700',
        textShadow: '1px 1px 5px #000',
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5rem',
        },
    },
    container: {
        position: 'relative',
        zIndex: 1,
    },
    page: {
        padding: '6em 0 3em 0',
        minHeight: '100vh',
        background: `url(${bg}) center no-repeat`,
        backgroundSize: 'cover',
        position: 'relative',
        '&::after': {
            content: `""`,
            display: 'block',
            position: 'absolute',
            top: '0',
            right: '0',
            left: '0',
            bottom: '0',
            background: '#000',
            opacity: '.5'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '3em 0 1em 0',
        }
    },
})

export default styles