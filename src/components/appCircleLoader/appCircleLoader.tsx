import { Backdrop, CircularProgress } from '@mui/material'
import { FC } from 'react'

type AppCircleLoaderProps = {
    size?: number
    invizible?: boolean
    content?: JSX.Element | false
    color?: 'primary' | 'secondary'
}

const AppCircleLoader: FC<AppCircleLoaderProps> = ({
    size = 80,
    invizible = true,
    content = <></>,
    color = 'secondary',
}) => {
    return (
        <Backdrop sx={{ flexDirection: 'column' }} open invisible={invizible}>
            <CircularProgress size={size} color={color} />
            {content}
        </Backdrop>
    )
}

export default AppCircleLoader
