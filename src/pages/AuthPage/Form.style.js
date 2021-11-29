
const styles = (theme) => ({
    paper: {
        maxWidth: 400,
        width: '100%',
        overflow: 'hidden',
    },
    grid: {
        padding: '1rem',
        '& > *': {
            marginTop: '1rem',
            '&:first-child': {
                marginTop: '0'
            },
        }
    },
    changeFormButton: {
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    header: {
        borderBottom: '1px solid #f0f0f0',
        padding: '1rem',
        backgroundColor: '#f7f7f7',
        fontWeight: 500
    },
    error: {
        color: 'red',
        fontWeight: 700,
        padding: theme.spacing(1),
        textAlign: 'center'
    }
})

export default styles