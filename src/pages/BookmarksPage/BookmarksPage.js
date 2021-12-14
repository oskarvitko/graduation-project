import { Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MaterialsList from '../../components/MaterialsList/MaterialsList'

const BookmarksPage = () => {
    const { materials } = useSelector(state => state.material)
    const [_materials, setMaterials] = useState([])

    useEffect(() => {
        setMaterials(materials.filter(material => material.isBookmark))
    }, [materials])

    return (
        <Container>
            <Typography variant='h5' style={{ fontWeight: 700, textAlign: 'center' }}>Избранное</Typography>
            <MaterialsList materials={_materials} />
        </Container>
    )
}

export default BookmarksPage