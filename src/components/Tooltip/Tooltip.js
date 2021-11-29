import React from 'react'
import { withStyles, Tooltip as MUITooltip } from '@material-ui/core'

const StyledTooltip = withStyles(theme => ({
    tooltip: props => ({
        fontSize: props.fontSize || 14,
        backgroundColor: props.bgc || 'rgba(97, 97, 97, 0.9)'
    })
}))(MUITooltip)

const Tooltip = (props) => {
    return (
        <StyledTooltip {...props} >
            {props.children}
        </StyledTooltip>
    )
}

export default Tooltip