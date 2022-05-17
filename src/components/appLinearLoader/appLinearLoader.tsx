import { Backdrop, LinearProgress } from '@mui/material'
import { FC } from 'react'

const AppLinearLoader: FC = () => {
    return (
        <Backdrop invisible open>
            <LinearProgress sx={{ width: 200 }} color="secondary" />
        </Backdrop>
    )
}

export default AppLinearLoader
