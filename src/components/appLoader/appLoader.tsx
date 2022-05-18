import { Backdrop, LinearProgress } from '@mui/material'
import { FC } from 'react'
import logo from '../../static/logo.png'

const AppLoader: FC = () => {
    return (
        <Backdrop open invisible sx={{ flexDirection: 'column' }}>
            <img
                style={{ maxWidth: 180, width: '100%', display: 'block' }}
                src={logo}
                alt=""
            />
            <LinearProgress
                sx={{
                    maxWidth: '180px !important',
                    mt: 2,
                    width: '90%',
                }}
                color="secondary"
            />
        </Backdrop>
    )
}

export default AppLoader
