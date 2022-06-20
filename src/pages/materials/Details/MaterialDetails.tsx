import {
    Button,
    Divider,
    Grid,
    LinearProgress,
    Rating,
    Typography,
} from '@mui/material'
import { useLazyGetMaterialCategoriesQuery } from 'api/categoryApi'
import { downloadFile, useLazyGetResourceURLQuery } from 'api/fileApi'
import {
    useGetMaterialsQuery,
    useUpdateBookmarkMutation,
    useAddRatingMutation,
    useGetMaterialRatingsQuery,
} from 'api/materialApi'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { useLazyGetSubjectsByTeacherIdQuery } from 'api/subjectApi'
import { useGetUserByTokenQuery, useLazyGetUserByIdQuery } from 'api/userApi'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import { materialTypes } from '../../../constants'
import useBreadcrumbs from 'hook/useBreadcrumbs'
import { IUser } from 'models/IUser'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ICategory } from 'structures/ICategory'
import { IMaterial } from 'structures/IMaterial'
import { Box } from '@mui/system'
import moment from 'moment'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'

export type downloadProgressType = {
    total: number
    current: number
    progress: number
}

const MaterialDetails: React.FC = () => {
    const { id } = useParams()

    const { data: materials } = useGetMaterialsQuery('')
    const { data: user } = useGetUserByTokenQuery()
    const [updateBookmark] = useUpdateBookmarkMutation()
    const [addRating] = useAddRatingMutation()
    const [fetchTeacher] = useLazyGetUserByIdQuery()
    const [fetchCatergories] = useLazyGetMaterialCategoriesQuery()
    const [fetchSubjects] = useLazyGetSubjectsByTeacherIdQuery()
    const [getResourceUrl] = useLazyGetResourceURLQuery()
    const { data: specialties, isLoading: specialtiesLoading } =
        useGetAllSpecialtiesQuery('')
    const { data: ratings } = useGetMaterialRatingsQuery('')

    const [isLoading, setLoading] = useState(true)
    const [fileLoading, setFileLoading] = useState(false)
    const [downloadProgress, setDownloadProgress] =
        useState<downloadProgressType>({
            total: 0,
            current: 0,
            progress: 0,
        })

    const [resourceURL, setResourceURL] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [specialty, setSpecialty] = useState<string>('')
    const [teacher, setTeacher] = useState<IUser | null>(null)
    const [category, setCategory] = useState<ICategory | null>(null)
    const [material, setMaterial] = useState<IMaterial | null>(null)

    const [rated, setRated] = useState<number | null>(null)
    const [ratingDialog, setRatingDialog] = useState(false)
    const [newRating, setNewRating] = useState(0)

    const { replaceLastBreadcrumb } = useBreadcrumbs()

    const fetchData = useCallback(async () => {
        if (!materials || specialtiesLoading) return
        const material = materials.find((item) => item.id === Number(id))
        if (!material) return

        setMaterial(material)

        const categories = await fetchCatergories('').unwrap()
        if (categories) {
            const category = categories.find(
                (item) => item.id === material.materialCategoryId
            )
            if (category) setCategory(category)
        }

        const teacher = await fetchTeacher(material.teacherUserId).unwrap()
        if (teacher) {
            setTeacher(teacher)
            const specialty = specialties?.find(
                (item) => item.id === teacher.specialtyId
            )
            if (specialty) {
                setSpecialty(specialty.name)
            }
        }

        const subjects = await fetchSubjects(
            'b4e5d794-dea2-4004-accc-a8e704cbce98'
        ).unwrap()
        if (subjects) {
            let subject = ''
            subjects.forEach((item) => {
                item.materials.forEach((_material) => {
                    if (_material.id === material.id) {
                        subject = item.name
                    }
                })
            })

            setSubject(subject)
        }

        if (material.materialType === materialTypes[4]) {
            const { url } = await getResourceUrl(
                material.id.toString()
            ).unwrap()
            setResourceURL(url)
        }

        replaceLastBreadcrumb({
            path: material.name,
            text: material.name,
        })

        setLoading(false)
        setFileLoading(false)
    }, [materials, specialtiesLoading])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        if (ratings && material) {
            for (let item of ratings) {
                if (item.materialId === material.id) {
                    return setRated(item.userRating)
                }
            }
        }
        setRated(null)
    }, [ratings, material])

    const downloadHandler = async () => {
        if (!material) return

        setFileLoading(true)
        const blob = await downloadFile(
            material.id.toString(),
            setDownloadProgress
        )
        if (!blob) return setFileLoading(false)

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${material.name}.${material.materialType}`
        a.click()
        window.URL.revokeObjectURL(url)
        setFileLoading(false)
    }

    const goToResourceHandler = () => {
        const a = document.createElement('a')
        a.href = resourceURL
        a.target = '_blank'
        a.click()
    }

    const toggleBookmarkHandler = () => {
        if (!user) return
        if (!material) return
        setFileLoading(true)
        updateBookmark({
            id: material.bookmark?.id || undefined,
            userId: user.id,
            materialId: material.id,
            bookmarkName: material.name,
            isBookmark: !material.bookmark?.isBookmark,
        })
    }

    if (isLoading) return <AppCircleLoader size={50} />

    return (
        <>
            {!isLoading && material ? (
                <>
                    <Grid
                        container
                        alignItems={'center'}
                        spacing={1}
                        sx={{ mb: 1 }}
                    >
                        <Grid xs item>
                            <Typography variant="h5">
                                {material.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            {material.materialType === materialTypes[4] ? (
                                <Button
                                    variant="outlined"
                                    onClick={goToResourceHandler}
                                >
                                    Перейти на ресурс
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={downloadHandler}
                                >
                                    Скачать - {material.materialType}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 1 }} />
                    <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs>
                            <Rating
                                value={
                                    material.materialRating?.averageRating || 0
                                }
                                max={10}
                                readOnly
                            />
                        </Grid>
                        <Grid item xs={'auto'}>
                            {!rated ? (
                                <Button
                                    onClick={() => setRatingDialog(true)}
                                    variant="outlined"
                                >
                                    Оценить
                                </Button>
                            ) : (
                                <Typography
                                    className="MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root  css-1thfajl-MuiButtonBase-root-MuiButton-root"
                                    sx={{ cursor: 'text' }}
                                >
                                    Ваша оценка - {rated}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={'auto'}>
                            <Button
                                variant="outlined"
                                onClick={toggleBookmarkHandler}
                            >
                                {material.bookmark?.isBookmark ? (
                                    <>
                                        <Bookmark color="primary" />
                                        Удалить из избранного
                                    </>
                                ) : (
                                    <>
                                        <BookmarkBorder color="primary" />
                                        Добавить в избранное
                                    </>
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 1 }} />
                    <Typography sx={sectionTitleSX}>Описание</Typography>
                    <Typography>{material.description}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Grid container spacing={5}>
                        <Grid item xs>
                            <Typography sx={sectionTitleSX}>
                                Общая информация
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Название: <b>{material.name}</b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Рейтинг:{' '}
                                <b>
                                    {material.materialRating?.averageRating ||
                                        0}
                                </b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Дата создания:{' '}
                                <b>
                                    {moment(material.createDate).format(
                                        'DD.MM.yyyy'
                                    )}
                                </b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Формат: <b>{material.materialType}</b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Категория: <b>{category?.category}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography sx={sectionTitleSX}>
                                Учебная информация
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Преподаватель:{' '}
                                <b>{teacher?.userName || '--/--'}</b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Предмет: <b>{subject || 'Общий материал'}</b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Специальность:{' '}
                                <b>{specialty || 'Общий материал'}</b>
                            </Typography>
                            <Typography sx={sectionTextSX}>
                                Курс: <b>{material.course}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <ConfirmDialog
                        open={ratingDialog}
                        title="Выберите оценку"
                        text={
                            <Rating
                                max={10}
                                value={newRating}
                                onChange={(event, newValue) =>
                                    setNewRating(newValue || 0)
                                }
                            />
                        }
                        onClose={() => {
                            setRatingDialog(false)
                            setNewRating(0)
                        }}
                        onCancel={() => {
                            setRatingDialog(false)
                            setNewRating(0)
                        }}
                        onAccept={async () => {
                            setRatingDialog(false)
                            setFileLoading(true)
                            await addRating({
                                userRating: newRating,
                                materialId: material.id,
                            })
                        }}
                    />
                </>
            ) : (
                <Typography variant="h6" sx={{ my: 1 }} align="center">
                    Материал не найден
                </Typography>
            )}
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
        </>
    )
}

const sectionTitleSX = {
    fontSize: 14,
    fontWeight: 500,
    mb: 1,
    color: 'var(--color-primary)',
}
const sectionTextSX = {
    fz: 18,
    my: 0.5,
    display: 'flex',
    justifyContent: 'space-between',
    b: {
        fontWeight: 500,
        ml: 0.5,
    },
}

export default MaterialDetails
