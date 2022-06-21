import { Close, Edit, Subject } from '@mui/icons-material'
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import {
    useCreateSubjectMutation,
    useGetAllSubjectsQuery,
    useUpdateSubjectMutation,
} from 'api/subjectApi'
import { useGetUserByTokenQuery } from 'api/userApi'
import { ROLES } from '../.././../../constants'
import useRole from 'hook/useRole'
import { createTextInput } from 'pages/auth/TextInput'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ISubject } from 'structures/ISubject'

const AddSubjectMenu = () => {
    const { hasRole } = useRole()
    const [open, setOpen] = useState(false)
    const [createSubject, { isLoading: creatingLoading }] =
        useCreateSubjectMutation()
    const [updateSubject, { isLoading: updatingLoading }] =
        useUpdateSubjectMutation()

    const { data: user } = useGetUserByTokenQuery()
    const { data: subjects, isLoading: subjectsLoading } =
        useGetAllSubjectsQuery(user?.id || '')
    const { data: specialties, isLoading: specialtiesLoading } =
        useGetAllSpecialtiesQuery(user?.id || '')

    const [createForm, setCreateForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [specialtyId, setSpecialtyId] = useState('')
    const [course, setCourse] = useState(1)
    const [edited, setEdited] = useState<ISubject | null>(null)

    const specialtiesInputId = useId()
    const courseInputId = useId()

    const isLoading =
        subjectsLoading ||
        specialtiesLoading ||
        creatingLoading ||
        updatingLoading

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
        },
    })

    useEffect(() => {
        if (specialties) {
            setSpecialtyId(specialties[0].id)
        }
    }, [specialties])

    const TextInput = createTextInput(register, false, errors, 'small')

    const specialtiesChangeHandler = (e: SelectChangeEvent) =>
        setSpecialtyId(e.target.value)
    const courseChangeHandler = (e: SelectChangeEvent) =>
        setCourse(Number(e.target.value))

    const openFormHandler = () => {
        setCreateForm(true)
    }

    const closeFormHandler = () => {
        setValue('name', '')
        setCourse(1)
        setCreateForm(false)
        setEditMode(false)
    }

    const openFormHandlerInEditMode = (item: ISubject) => {
        setEditMode(true)
        setEdited(item)
        setCourse(item.course)
        setSpecialtyId(item.specialtyId.toString())
        setValue('name', item.name)
        setCreateForm(true)
    }

    const onClose = () => setOpen(false)

    const onSubmit = async (data: any) => {
        if (!user) return
        if (editMode) {
            if (edited) {
                await updateSubject({
                    name: data.name,
                    course,
                    specialtyId: Number(specialtyId),
                    userId: user.id,
                    subjectId: edited.id,
                })
            }
        } else {
            await createSubject({
                name: data.name,
                course,
                specialtyId: Number(specialtyId),
                userId: user.id,
            })
        }
        closeFormHandler()
    }

    return (
        <>
            <Tooltip title="Предметы">
                <IconButton onClick={() => setOpen(true)}>
                    <Subject color="primary" />
                </IconButton>
            </Tooltip>
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        width: 700,
                        maxHeight: 'none',
                        maxWidth: 700,
                    },
                }}
                open={open}
                onClose={onClose}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    Предметы
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {isLoading ? (
                        <CircularProgress
                            sx={{ mx: 'auto', my: 5, display: 'block' }}
                            color="primary"
                            size={50}
                        />
                    ) : (
                        <>
                            {hasRole(ROLES.ADMIN) && createForm && (
                                <Grid
                                    component="form"
                                    container
                                    alignItems={'flex-start'}
                                    spacing={1}
                                    sx={{ my: 1 }}
                                >
                                    <Grid item xs>
                                        <TextInput
                                            label={'Название предмета'}
                                            name={'name'}
                                            autocomplete={false}
                                            validation={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Поле должно быть заполнено',
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        {specialties && (
                                            <FormControl size="small" fullWidth>
                                                <InputLabel
                                                    id={specialtiesInputId}
                                                >
                                                    Специальность
                                                </InputLabel>
                                                <Select
                                                    labelId={specialtiesInputId}
                                                    value={specialtyId}
                                                    label="Специальность"
                                                    onChange={
                                                        specialtiesChangeHandler
                                                    }
                                                >
                                                    {specialties.map((item) => (
                                                        <MenuItem
                                                            value={item.id}
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl size="small" fullWidth>
                                            <InputLabel id={courseInputId}>
                                                Курс
                                            </InputLabel>
                                            <Select
                                                labelId={courseInputId}
                                                value={course.toString()}
                                                label="Курс"
                                                onChange={courseChangeHandler}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            )}
                            {hasRole(ROLES.ADMIN) && (
                                <>
                                    <Button
                                        variant="outlined"
                                        color={
                                            createForm ? 'success' : 'primary'
                                        }
                                        onClick={
                                            createForm
                                                ? handleSubmit(onSubmit)
                                                : openFormHandler
                                        }
                                    >
                                        {createForm
                                            ? 'Сохранить'
                                            : 'Добавить предмет'}
                                    </Button>
                                    {createForm && (
                                        <Button
                                            sx={{ ml: 1 }}
                                            variant="outlined"
                                            onClick={closeFormHandler}
                                        >
                                            Отмена
                                        </Button>
                                    )}
                                </>
                            )}

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Название</TableCell>
                                            <TableCell align="center">
                                                Специальность
                                            </TableCell>
                                            <TableCell align="center">
                                                Курс
                                            </TableCell>
                                            {hasRole(ROLES.ADMIN) && (
                                                <TableCell align="center"></TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {subjects &&
                                            subjects.map((subject) => (
                                                <TableRow key={subject.id}>
                                                    <TableCell>
                                                        {subject.name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {specialties &&
                                                            specialties.find(
                                                                (item) =>
                                                                    Number(
                                                                        item.id
                                                                    ) ===
                                                                    subject.specialtyId
                                                            )?.name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {subject.course}
                                                    </TableCell>
                                                    {hasRole(ROLES.ADMIN) && (
                                                        <TableCell align="center">
                                                            <Tooltip title="Редактировать">
                                                                <IconButton
                                                                    onClick={() =>
                                                                        openFormHandlerInEditMode(
                                                                            subject
                                                                        )
                                                                    }
                                                                >
                                                                    <Edit color="primary" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddSubjectMenu
