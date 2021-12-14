import { Box, Button, Container, Dialog, DialogContent, Grid, IconButton, Link, Modal, Paper, Tooltip, Typography } from '@material-ui/core'
import { Cancel, Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import AppBackdrop from '../../components/AppBackdrop/AppBackdrop'
import { delay } from '../../http'
import { setMaterials } from '../../redux/actions/material-actions'
import { NotFoundPage } from '../NotFound'
import photoURL from './photo.png'

const Material = (props) => {
    const {
        setMaterials
    } = props

    const { materials } = useSelector(state => state.material)
    const [material, setMaterial] = useState(null)
    const [modal, setModal] = useState(false)

    useEffect(async () => {
        const id = window.location.pathname.split('/')[2]
        if (material === null) await delay(500)

        setMaterial(materials.find(_material => _material.id === id))
    }, [materials])

    const toggleBookmark = () => {
        const index = materials.indexOf(material)
        setMaterials(materials.map((_material, i) => {
            if (i === index)
                return {
                    ...material,
                    isBookmark: !material.isBookmark
                }

            return _material
        }))
    }

    const openHandler = () => {
        setModal(true)
        const index = materials.indexOf(material)
        setMaterials(materials.map((_material, i) => {
            if (i === index)
                return {
                    ...material,
                    watched: material.watched + 1
                }

            return _material
        }))
    }

    const closeHandler = () => {
        setModal(false)
    }

    const downloadHandler = () => {
        if (material.donwloadLink) {
            const link = document.createElement('a')
            link.href = material.donwloadLink
            link.target = '_blank'
            const arr = material.donwloadLink.split('/')
            link.setAttribute('download', arr[arr.length - 1])
            link.click()
            const index = materials.indexOf(material)
            setMaterials(materials.map((_material, i) => {
                if (i === index)
                    return {
                        ...material,
                        downloaded: material.downloaded + 1
                    }

                return _material
            }))
        }
    }

    if (material === null) return <AppBackdrop style={{ backgroundColor: '#fff' }} open={true} />

    return material === undefined ?
        <NotFoundPage /> :
        (
            <Container>
                <Paper elevation='3' style={{ padding: 16, width: '100%', borderRadius: 0 }}>
                    <Typography variant='h6' style={{ fontWeight: 700, textAlign: 'center', fontSize: 20, marginBottom: 20 }}>
                        {material.title}
                    </Typography>
                    <Grid container>
                        <Grid style={{ textAlign: 'center' }} item xs={4}>
                            <img style={{ border: '1px solid #8A33DC', width: '80%' }} src={material.img || photoURL} />
                        </Grid>
                        <Grid item xs style={{ marginLeft: 16 }}>
                            <Grid container style={{ fontSize: 18 }}>
                                <Grid item xs={'auto'}>
                                    <div style={{ fontWeight: 500, marign: 10 }}>Автор:</div>
                                    <div style={{ fontWeight: 500, marign: 10 }}>Просмотров:</div>
                                    <div style={{ fontWeight: 500, marign: 10 }}>Скачиваний:</div>
                                    {material.pages && <div style={{ fontWeight: 500, marign: 10 }}>Страниц:</div>}
                                    <div style={{ fontWeight: 500, marign: 10 }}>Кафедра:</div>
                                    <div style={{ fontWeight: 500, marign: 10 }}>Дисциплина:</div>
                                </Grid>
                                <Grid item xs style={{ marginLeft: 16 }}>
                                    <div style={{ marign: 10 }}>{material.author}</div>
                                    <div style={{ marign: 10 }}>{material.watched}</div>
                                    <div style={{ marign: 10 }}>{material.downloaded}</div>
                                    {material.pages && <div style={{ marign: 10 }}>{material.pages}</div>}
                                    <div style={{ marign: 10 }}>{material.faculty}</div>
                                    <div style={{ marign: 10 }}>{material.subject}</div>
                                </Grid>
                            </Grid>
                            <Grid style={{ marginTop: 159 }} container justifyContent='flex-end'>
                                <Grid style={{ marginLeft: 16 }} item='auto'>
                                    <Button onClick={toggleBookmark} color='primary' variant='contained'>
                                        {material.isBookmark ?
                                            'Удалить из избранного' :
                                            'Добавить в избранное'
                                        }
                                    </Button>
                                </Grid>
                                <Grid style={{ marginLeft: 16 }} item='auto'>
                                    <Button onClick={openHandler} color='primary' variant='contained'>Просмотр</Button>
                                </Grid>
                                <Grid style={{ marginLeft: 16 }} item='auto'>
                                    <Button onClick={downloadHandler} style={{ color: '#fff', backgroundColor: 'green' }} variant='contained'>Скачать</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                {modal && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                        width: '100%',
                        height: 'calc(100% - 64px)',
                        marginTop: 64
                    }} >
                        <IconButton
                            onClick={closeHandler}
                            variant='contained'
                            color='primary'
                            size='large'
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}>
                            <Tooltip title='Close'>
                                <Cancel style={iconStyle} />
                            </Tooltip>
                        </IconButton>
                        <iframe style={{ width: 'calc(100% - 150px)', height: '100%', margin: '0 auto', display: 'block' }} src={material.link} />
                    </div>
                )}
            </Container>
        )
}

const iconStyle = {
    fontSize: 50
}

const mapDispatchToProps = dispatch => ({
    setMaterials: (data) => dispatch(setMaterials(data))
})

export default connect(null, mapDispatchToProps)(Material)