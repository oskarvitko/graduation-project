import { Add, Close } from '@mui/icons-material'
import {
    Alert,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    Stack,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { Box } from '@mui/system'
import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
import { uploadFile, useLazyGetResourceURLQuery } from 'api/fileApi'
import {
    createAndUploadMaterial,
    CreateAndUploadMaterialType,
    useAddMaterialToSubjectMutation,
    useEditMaterialMutation,
} from 'api/materialApi'
import {
    useAddMaterialToSpecialtiesMutation,
    useGetAllSpecialtiesQuery,
} from 'api/specialtyApi'
import { useGetUserByTokenQuery } from 'api/userApi'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import { materialTypes } from '../../../../constants'
import { useAppDispatch, useAppSelector } from 'hook/redux'
import { createTextInput } from 'pages/auth/TextInput'
import { downloadProgressType } from 'pages/materials/Details/MaterialDetails'
import prettyBytes from 'pretty-bytes'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { materialsSlice } from 'store/reducers/materialsReducer'
import { IUser } from 'models/IUser'
import { useGetAllSubjectsQuery } from 'api/subjectApi'

const EditMaterialMenu: React.FC<{ refetchMaterials: () => void }> = ({
    refetchMaterials,
}) => {
    const {
        createMode,
        createDialog: open,
        editedMaterial,
    } = useAppSelector((state) => state.materials)
    const dispatch = useAppDispatch()
    const { setCreateDialog, openDialog } = materialsSlice.actions
    const setOpen = (value: boolean) => dispatch(setCreateDialog(value))

    const [downloadProgress, setDownloadProgress] =
        useState<downloadProgressType>({
            total: 0,
            current: 0,
            progress: 0,
        })
    const [fileLoading, setFileLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        clearErrors,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            description: '',
            url: '',
        },
    })

    const TextInput = createTextInput(register, false, errors, 'small')

    const categoryInputId = useId()
    const specialtyInputId = useId()
    const courseInputId = useId()
    const subjectInputId = useId()

    const { data: user, isLoading: userLoading } = useGetUserByTokenQuery()
    const { data: specialties, isLoading: specialtiesLoading } =
        useGetAllSpecialtiesQuery(user?.id || '', { skip: !user })
    const { data: subjects, isLoading: subjectsLoading } =
        useGetAllSubjectsQuery(user?.id || '', { skip: !user })
    const { data: categories, isLoading: categoriesLoading } =
        useGetMaterialCategoriesQuery(user?.id || '', { skip: !user })
    const [addMaterialToSpecialty] = useAddMaterialToSpecialtiesMutation()
    const [addMaterialToSubjects] = useAddMaterialToSubjectMutation()
    const [getResourceUrl, { isLoading: urlLoading }] =
        useLazyGetResourceURLQuery()
    const [editMaterialRequest] = useEditMaterialMutation()

    const isLoading =
        categoriesLoading ||
        userLoading ||
        urlLoading ||
        specialtiesLoading ||
        subjectsLoading

    const [course, setCourse] = useState<number>(
        createMode ? 1 : editedMaterial?.course || 1
    )
    const [subjectId, setSubjectId] = useState<number | null>()
    const [materialCategoryId, setMaterialCategoryId] = useState<number | null>(
        null
    )

    const [specialtyIds, setSpecialtyIds] = useState<string[]>([])
    const [popup, setPopup] = useState({
        open: false,
        message: '',
    })
    const fileRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const [fileMode, setFileMode] = useState<'file' | 'url'>('file')

    const prepareData = useCallback(async () => {
        if (!user) return

        setFile(null)
        if (createMode) {
            if (specialties) setSpecialtyIds([specialties[0].id.toString()])
            if (subjects) setSubjectId(subjects[0].id)
            setValue('name', '')
            setValue('description', '')
            setValue('url', '')
            return setCourse(1)
        }
        if (editedMaterial) {
            setValue('name', editedMaterial.name)
            setValue('description', editedMaterial.description)
            setCourse(editedMaterial.course)
            if (editedMaterial.materialType === materialTypes[4]) {
                const { url } = await getResourceUrl(
                    editedMaterial.id.toString()
                ).unwrap()
                if (url) {
                    setValue('url', url)
                    setFileMode('url')
                }
            } else {
                setValue('url', '')
                setFileMode('file')
                setFile(
                    new File(
                        [new Blob()],
                        `${editedMaterial.name}.${editedMaterial.materialType}`
                    )
                )
            }
        }
    }, [user, open, editedMaterial, createMode])

    useEffect(() => {
        prepareData()
    }, [prepareData])

    useEffect(() => {
        if (!categories) return
        if (createMode) return setMaterialCategoryId(categories[0].id || null)
        if (editedMaterial)
            return setMaterialCategoryId(editedMaterial.materialCategoryId)
    }, [categories])

    const onClose = () => {
        setOpen(false)
        clearErrors()
    }

    const onSubmit = async (data: any) => {
        if (fileMode === 'file' && !file && !data.url)
            return setPopup({
                open: true,
                message: 'Выберите файл или введите URL!',
            })
        if (!specialtyIds.length)
            return setPopup({
                open: true,
                message: 'Выберите специальность!',
            })
        if (!user) return

        const body: CreateAndUploadMaterialType = {
            TeacherUserId: user.id,
            MaterialCategoryId: Number(materialCategoryId),
            Name: data.name,
            Course: course,
            Description: data.description,
        }

        if (fileMode === 'file') body.file = file as File
        else body.Url = data.url

        setFileLoading(true)
        createMode
            ? await saveMaterial(body, user)
            : await editMaterial(body, user)
        await refetchMaterials()
        setFileLoading(false)
        setOpen(false)
    }

    const saveMaterial = async (
        data: CreateAndUploadMaterialType,
        user: IUser
    ) => {
        const newMaterial = await createAndUploadMaterial(
            data,
            setDownloadProgress
        )
        if (newMaterial) {
            await addMaterialToSpecialty({
                materialId: newMaterial?.id,
                specialtyIds: specialtyIds.map((item) => Number(item)),
            })
            if (subjectId)
                await addMaterialToSubjects({
                    materialIds: [newMaterial.id],
                    subjectId,
                })
        }
    }

    const editMaterial = async (
        data: CreateAndUploadMaterialType,
        user: IUser
    ) => {
        if (!user) return
        if (!editedMaterial) return

        const { file, Url } = data

        const isFile = file
        let fileId = editedMaterial.fileId
        let materialType = editedMaterial.materialType

        if (isFile) {
            if (file?.size !== 0) {
                const newFile = await uploadFile(file, setDownloadProgress)
                if (newFile) {
                    fileId = newFile.id
                    materialType =
                        newFile.name.split('.')[
                            newFile.name.split('.').length - 1
                        ]
                }
            }
        } else {
            const newUrl = await uploadFile(Url || '', setDownloadProgress)
            if (newUrl) {
                fileId = newUrl.id
                materialType = materialTypes[4]
            }
        }

        await editMaterialRequest({
            materialId: editedMaterial.id,
            userId: user.id,
            fileId,
            materialCategoryId: data.MaterialCategoryId,
            name: data.Name,
            course: data.Course,
            materialType,
            description: data.Description,
        })
    }

    const categoryChangeHandler = (e: SelectChangeEvent) =>
        setMaterialCategoryId(Number(e.target.value))
    const courseChangeHandler = (e: SelectChangeEvent) =>
        setCourse(Number(e.target.value))
    const subjectChangeHandler = (e: SelectChangeEvent) =>
        setSubjectId(Number(e.target.value))
    const specialtiesIdsChangeHandler = (e: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = e
        setSpecialtyIds(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <>
            <Tooltip title="Добавить материал">
                <IconButton onClick={() => dispatch(openDialog(true))}>
                    <Add color="primary" />
                </IconButton>
            </Tooltip>
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        width: 600,
                        maxHeight: 'none',
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
                    {createMode ? 'Добавление' : 'Изменение'} материала{' '}
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
                        <Box
                            sx={{
                                '& > *': {
                                    mt: '15px !important',
                                },
                            }}
                            component={'form'}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextInput
                                label="Название материала"
                                name="name"
                                autocomplete={false}
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Поле должно быть заполнено',
                                    },
                                }}
                            />
                            <TextInput
                                label="Описание материала"
                                name="description"
                                autocomplete={false}
                                multiline={true}
                                validation={{
                                    required: {
                                        value: true,
                                        message: 'Поле должно быть заполнено',
                                    },
                                    minLength: {
                                        value: 10,
                                        message:
                                            'Описание должно содержать минимум 10 символов',
                                    },
                                }}
                            />
                            {materialCategoryId !== null && (
                                <FormControl size="small" fullWidth>
                                    <InputLabel id={categoryInputId}>
                                        Категория материала
                                    </InputLabel>
                                    <Select
                                        labelId={categoryInputId}
                                        value={materialCategoryId.toString()}
                                        label="Категория материала"
                                        onChange={categoryChangeHandler}
                                    >
                                        {categories &&
                                            categories.map((category) => (
                                                <MenuItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.category}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            )}
                            <FormControl size="small" fullWidth>
                                <InputLabel id={courseInputId}>
                                    Для какого курса
                                </InputLabel>
                                <Select
                                    labelId={courseInputId}
                                    value={course.toString()}
                                    label="Для какого курса"
                                    onChange={courseChangeHandler}
                                >
                                    <MenuItem value={1}>{1}</MenuItem>
                                    <MenuItem value={2}>{2}</MenuItem>
                                    <MenuItem value={3}>{3}</MenuItem>
                                    <MenuItem value={4}>{4}</MenuItem>
                                </Select>
                            </FormControl>
                            {specialties && createMode && (
                                <FormControl size="small" fullWidth>
                                    <InputLabel id={specialtyInputId}>
                                        Специальности
                                    </InputLabel>
                                    <Select
                                        multiple
                                        labelId={specialtyInputId}
                                        value={specialtyIds}
                                        label="Специальности"
                                        onChange={specialtiesIdsChangeHandler}
                                        renderValue={(value) =>
                                            specialties
                                                .filter((item) =>
                                                    value.find(
                                                        (_item) =>
                                                            _item ===
                                                            item.id.toString()
                                                    )
                                                )
                                                .map((item) => item.name)
                                                .join(', ')
                                        }
                                    >
                                        {specialties.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id.toString()}
                                            >
                                                <Checkbox
                                                    checked={
                                                        !!specialtyIds.find(
                                                            (_item) =>
                                                                _item ===
                                                                item.id.toString()
                                                        )
                                                    }
                                                />
                                                <ListItemText>
                                                    {item.name}
                                                </ListItemText>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            {subjects && createMode && subjectId && (
                                <FormControl size="small" fullWidth>
                                    <InputLabel id={subjectInputId}>
                                        Предмет
                                    </InputLabel>
                                    <Select
                                        labelId={subjectInputId}
                                        value={subjectId.toString()}
                                        label="Предмет"
                                        onChange={subjectChangeHandler}
                                    >
                                        {subjects.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <Divider />
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ mb: -1 }}
                            >
                                <Typography>URL</Typography>
                                <Switch
                                    checked={fileMode === 'file'}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setFile(null)
                                        setFileMode(
                                            event.target.checked
                                                ? 'file'
                                                : 'url'
                                        )
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Typography>Файл</Typography>
                            </Stack>
                            {fileMode === 'file' ? (
                                <Grid
                                    container
                                    alignItems={'flex-end'}
                                    spacing={1}
                                >
                                    <Grid item xs>
                                        {file ? (
                                            <>
                                                <Typography>
                                                    <b>Выбран:</b>{' '}
                                                    {file.name
                                                        .split('.')
                                                        .slice(
                                                            0,
                                                            file.name.split('.')
                                                                .length - 1
                                                        )
                                                        .join('.')}
                                                </Typography>
                                                <Typography>
                                                    <b>Формат файла:</b>{' '}
                                                    {
                                                        file.name.split('.')[
                                                            file.name.split('.')
                                                                .length - 1
                                                        ]
                                                    }
                                                </Typography>
                                                <Typography>
                                                    {file.size > 0 && (
                                                        <>
                                                            <b>Размер файла:</b>{' '}
                                                            {prettyBytes(
                                                                file.size
                                                            )}
                                                        </>
                                                    )}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography>
                                                Файл не выбран
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={'auto'}>
                                        <label htmlFor="contained-button-file">
                                            <input
                                                style={{ display: 'none' }}
                                                accept="application/msword, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/pdf"
                                                id="contained-button-file"
                                                type="file"
                                                ref={fileRef}
                                                onChange={() => {
                                                    if (fileRef.current?.files)
                                                        setFile(
                                                            fileRef.current
                                                                ?.files[0]
                                                        )
                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                                component="span"
                                            >
                                                {file
                                                    ? 'Изменить выбор'
                                                    : 'Выбрать файл'}
                                            </Button>
                                        </label>
                                    </Grid>
                                </Grid>
                            ) : (
                                <TextInput
                                    label="URL стороннего ресурса"
                                    name="url"
                                    validation={{
                                        required: {
                                            value: true,
                                            message:
                                                'Поле должно быть заполнено',
                                        },
                                        pattern: {
                                            value: /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi,
                                            message: 'Пожалуйста введите URL',
                                        },
                                    }}
                                />
                            )}
                            <Divider />
                            <Button
                                sx={{ display: 'block', ml: 'auto' }}
                                variant="outlined"
                                color="success"
                                type="submit"
                            >
                                {createMode ? 'Сохранить' : 'Обновить'}
                            </Button>
                        </Box>
                    )}
                </DialogContent>
                <Snackbar
                    open={popup.open}
                    autoHideDuration={6000}
                    onClose={() =>
                        setPopup((prev) => ({ ...prev, open: false }))
                    }
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    sx={{ zIndex: 2000 }}
                >
                    <Alert
                        variant="filled"
                        onClose={() =>
                            setPopup((prev) => ({ ...prev, open: false }))
                        }
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {popup.message}
                    </Alert>
                </Snackbar>
                {fileLoading && (
                    <AppCircleLoader
                        color={'primary'}
                        invizible={false}
                        size={50}
                        content={
                            !!downloadProgress.progress && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography color="#fff">
                                        Загрузка...{' '}
                                        {downloadProgress.current.toFixed(0)}% /{' '}
                                        {downloadProgress.total.toFixed(0)}%
                                    </Typography>

                                    <LinearProgress
                                        sx={{ mt: 0.5 }}
                                        variant={'determinate'}
                                        value={downloadProgress.progress}
                                    />
                                </Box>
                            )
                        }
                    />
                )}
            </Dialog>
        </>
    )
}

export default EditMaterialMenu
