import { Backdrop, CircularProgress, withStyles } from '@material-ui/core'
import React from 'react'

const StyledBackdrop = withStyles(theme => ({
    root: {
        zIndex: theme.zIndex.appBar - 1
    }
}))(Backdrop)

const AppBackdrop = (props) => {
    return <StyledBackdrop {...props}>
        <CircularProgress color={props.color || 'primary'} />
    </StyledBackdrop>
}

export default AppBackdrop