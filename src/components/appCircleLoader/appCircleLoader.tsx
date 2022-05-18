import { Backdrop, CircularProgress } from '@mui/material'
import { FC } from 'react'

const AppCircleLoader: FC = () => {
    return (
        <Backdrop open invisible>
            <CircularProgress size={80} color="secondary" />
        </Backdrop>
    )
}

export default AppCircleLoader
