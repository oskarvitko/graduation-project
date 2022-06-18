import { Backdrop, CircularProgress } from '@mui/material'
import { FC } from 'react'

type AppCircleLoaderProps = {
    size?: number
}

const AppCircleLoader: FC<AppCircleLoaderProps> = ({ size = 80 }) => {
    return (
        <Backdrop open invisible>
            <CircularProgress size={size} color="secondary" />
        </Backdrop>
    )
}

export default AppCircleLoader
