import { Grid, LinearProgress } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import logo from '../../static/logo.png'

const AppLoader: FC = () => {
    return (
        <AnimatePresence>
            <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
            >
                <Grid
                    container
                    direction={'column'}
                    sx={{
                        position: 'absolute',
                        zIndex: 1000,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    alignItems="center"
                    justifyContent={'center'}
                >
                    <Grid item>
                        <img style={{ width: '100%' }} src={logo} alt="" />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            maxWidth: '200px !important',
                            mt: 2,
                            width: '90%',
                        }}
                    >
                        <LinearProgress color="secondary" />
                    </Grid>
                </Grid>
            </motion.div>
        </AnimatePresence>
    )
}

export default AppLoader
