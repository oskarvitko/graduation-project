import { Button, ButtonGroup, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AppBackdrop from '../../components/AppBackdrop/AppBackdrop'
import MaterialsList from '../../components/MaterialsList/MaterialsList'
import { delay } from '../../http'

const DEFAULTS = {
    author: 'Все',
    faculty: 'Все',
    subject: 'Все'
}

const MySelect = (props) => {
    const {
        title,
        value,
        onChange,
        array
    } = props

    return (
        <FormControl fullWidth style={{ marginTop: 10 }}>
            <InputLabel id="demo-simple-select-label">{title}</InputLabel>
            <Select
                value={value}
                label={title}
                onChange={onChange}
            >
                {array.map((item, i) => {
                    return (
                        <MenuItem key={i} value={item}>{item}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

const Materials = () => {
    const [_materials, setMaterials] = useState([])

    const [isLoading, setLoading] = useState(true)

    const [authors, setAuthors] = useState([])
    const [author, setAuthor] = useState(DEFAULTS.author)

    const [facultets, setFacultets] = useState([])
    const [faculty, setFaculty] = useState(DEFAULTS.faculty)

    const [subjects, setSubjects] = useState([])
    const [subject, setSubject] = useState(DEFAULTS.subject)

    const {
        materials
    } = useSelector(state => state.material)

    const changeAuthor = (event) => setAuthor(event.target.value)

    const changeFaculty = (event) => setFaculty(event.target.value)

    const changeSubject = (event) => setSubject(event.target.value)

    const filter = () => {
        let filtered = materials

        // author
        if (author !== DEFAULTS.author)
            filtered = filtered.filter(material => material.author.toLowerCase().includes(author.toLowerCase()))
        // faculty
        if (faculty !== DEFAULTS.faculty)
            filtered = filtered.filter(material => material.faculty === faculty)
        // subject
        if (subject !== DEFAULTS.subject)
            filtered = filtered.filter(material => material.subject === subject)

        setMaterials(filtered)
    }

    useEffect(async () => {
        // authors
        const authors = []
        materials.forEach(item => {
            item.author.split(',').forEach(author => {
                const _author = author.trim()
                const result = authors.find(_item => _item === _author)
                if (!result)
                    authors.push(_author)
            })
        })
        setAuthors([...authors, DEFAULTS.author])

        // facultets
        const facultets = []
        materials.forEach(item => {
            const result = facultets.find(_item => _item === item.faculty)
            if (!result && item.faculty)
                facultets.push(item.faculty)
        })
        setFacultets([...facultets, DEFAULTS.faculty])

        // subject
        const subjects = []
        materials.forEach(item => {
            const result = subjects.find(_item => _item === item.subject)
            if (!result && item.subject)
                subjects.push(item.subject)
        })

        setSubjects([...subjects, DEFAULTS.subject])

        await delay(500)

        setLoading(false)
    }, [_materials])

    useEffect(() => {
        filter()
    }, [author, faculty, subject])

    if (isLoading) return <AppBackdrop style={{ backgroundColor: '#fff' }} open={true} />

    return (
        <Container>
            <Typography variant='h5' style={{ fontWeight: 700, textAlign: 'center' }}>Каталог учебных материалов</Typography>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <MySelect
                    title='Автор'
                    value={author}
                    onChange={changeAuthor}
                    array={authors}
                />

                <MySelect
                    title='Кафедра'
                    value={faculty}
                    onChange={changeFaculty}
                    array={facultets}
                />

                <MySelect
                    title='Дисциплина'
                    value={subject}
                    onChange={changeSubject}
                    array={subjects}
                />
            </div>
            <MaterialsList materials={_materials} />
        </Container>
    )
}

export default Materials