import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { FC } from 'react'

type AppProgressProps = {
    progress: number
}

const AppProgress: FC<AppProgressProps> = ({ progress }) => {
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const newHeight = progress ? 4 : 0
        if (progress === 100) return setHeight(0)

        if (height !== newHeight) setHeight(newHeight)
    }, [progress])

    return (
        <LinearProgress
            variant="determinate"
            value={progress}
            color="secondary"
            sx={{ height, transition: 'height .3s ease' }}
        />
    )
}

export default AppProgress
