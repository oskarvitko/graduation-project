import { createTheme } from "@material-ui/core"

const theme = createTheme({
    palette: {
        primary: {
            main: '#8A33DC',
            secondary: '#BB6BD9'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 575,
            md: 768,
            lg: 991,
            xl: 1200,
            xxl: 1400
        }
    }
})

export default theme