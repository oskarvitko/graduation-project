import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import React from 'react'

type HeaderTooltipProps = {
    title: string
    children: JSX.Element
    open?: boolean
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        fontSize: 13,
    },
})

const HeaderTooltip: React.FC<HeaderTooltipProps> = (props) => {
    return (
        <StyledTooltip
            title={props.title}
            placement="left"
            enterDelay={600}
            disableHoverListener={props.open}
        >
            {props.children}
        </StyledTooltip>
    )
}

export default HeaderTooltip
