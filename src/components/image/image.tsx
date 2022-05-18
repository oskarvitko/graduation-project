import { CircularProgress, Grid } from '@mui/material'
import React, { useState } from 'react'

type ImageProps = {
    src: string
    alt?: string
    className?: string
}

const Image: React.FC<ImageProps> = (props) => {
    const [isLoading, setLoading] = useState(true)

    const onLoad = () => {
        setLoading(false)
    }

    return (
        <>
            {isLoading && (
                <Grid
                    container
                    sx={{ height: '100%' }}
                    alignItems="center"
                    justifyContent={'center'}
                >
                    <CircularProgress color="inherit" />
                </Grid>
            )}
            <img
                onLoad={onLoad}
                src={props.src}
                className={props.className}
                alt={props.alt}
                loading="lazy"
            />
        </>
    )
}

export default Image
