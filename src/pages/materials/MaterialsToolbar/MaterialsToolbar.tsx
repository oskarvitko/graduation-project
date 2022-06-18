import { Grid, SelectChangeEvent, CircularProgress } from '@mui/material'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import {
    useGetTeacherByStudentUserIdQuery,
    useGetUserByTokenQuery,
} from 'api/userApi'
import { ROLES } from '../../../constants'
import useRole from 'hook/useRole'
import React, { useEffect, useState } from 'react'
import { IMaterial } from 'structures/IMaterial'
import Search from './Search'
import SpecialtyFilter from './SpecialtyFilter'
import TeachersFilter from './TeachersFilter'
import MaterialTypeFilter from './MaterialTypeFilter'
import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
import MaterialCategoryFilter from './MaterialCategoryFilter'

export type MaterialFilterType = {
    materialName: string
    specialtyId?: string
    teacherUserId?: string
    courses: number[]
    materialType?: string
}

type MaterialsToolbatProps = {
    data: IMaterial[]
    disabled: boolean
    setFilteredData: (data: IMaterial[]) => void
    setFilter: (filter: MaterialFilterType) => void
    setLoading: (value: boolean) => void
}

const MaterialsToolbar: React.FC<MaterialsToolbatProps> = ({
    data,
    disabled,
    setFilteredData,
    setFilter,
    setLoading,
}) => {
    const { hasRole } = useRole()
    const { data: user } = useGetUserByTokenQuery()
    const { data: teachers, isLoading: teachersLoading } =
        useGetTeacherByStudentUserIdQuery((user?.studentId || '') as string)
    const { data: specialties, isLoading: specialtyLoading } =
        useGetAllSpecialtiesQuery('')
    const { data: categories, isLoading: categoriesLoading } =
        useGetMaterialCategoriesQuery('')

    const componentLoading =
        teachersLoading || specialtyLoading || categoriesLoading

    const courses = !hasRole(ROLES.ADMIN)
        ? user
            ? [user.course]
            : []
        : [1, 2, 3, 4]

    const [materialName, setMaterialName] = useState('')
    const [materialType, setMaterialType] = useState<string | undefined>(
        undefined
    )
    const [specialty, setSpecialty] = useState<string | undefined>(
        user?.specialtyId || undefined
    )
    const [materialCategory, setMaterialCategory] = useState<
        string[] | undefined
    >(categories?.map((item) => item.category))
    const [teacherId, setTeacherId] = useState<string | undefined>(undefined)

    useEffect(() => {
        setFilter({
            materialName,
            specialtyId: specialty,
            teacherUserId: teacherId,
            materialType,
            courses,
        })
    }, [materialName, specialty, teacherId, materialType])

    useEffect(() => {
        setLoading(componentLoading)
    }, [teachersLoading, specialtyLoading, categoriesLoading])

    if (componentLoading)
        return (
            <CircularProgress size={30} sx={{ mx: 'auto', display: 'block' }} />
        )

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs container spacing={1} alignItems="center">
                <LoadedItem
                    xs={3}
                    loading={specialtyLoading}
                    data={hasRole(ROLES.STUDENT) ? null : specialties}
                >
                    <SpecialtyFilter
                        specialties={specialties}
                        value={specialty}
                        onChange={(e: SelectChangeEvent) =>
                            setSpecialty(e.target.value || undefined)
                        }
                    />
                </LoadedItem>
                <LoadedItem
                    xs={3}
                    loading={categoriesLoading}
                    data={categories}
                >
                    <MaterialCategoryFilter
                        categories={categories || []}
                        value={materialCategory}
                        onChange={(
                            e: SelectChangeEvent<typeof materialCategory>
                        ) => {
                            setMaterialCategory(
                                typeof e.target.value === 'string'
                                    ? e.target.value.split(',')
                                    : e.target.value
                            )
                        }}
                    />
                </LoadedItem>
                <LoadedItem xs={3} data={[]}>
                    <MaterialTypeFilter
                        value={materialType}
                        onChange={(e: SelectChangeEvent) =>
                            setMaterialType(e.target.value || undefined)
                        }
                    />
                </LoadedItem>
                <LoadedItem xs={3} loading={teachersLoading} data={teachers}>
                    <TeachersFilter
                        teachers={teachers}
                        onChange={setTeacherId}
                    />
                </LoadedItem>
            </Grid>
            <Grid item xs={'auto'}>
                <Search onChange={setMaterialName} />
            </Grid>
        </Grid>
    )
}

type LoadedItemProps = {
    xs: number | 'auto'
    loading?: boolean
    data?: any
}

const LoadedItem: React.FC<LoadedItemProps> = ({
    xs,
    loading,
    children,
    data,
}) => {
    if (!loading && !data) return null

    return (
        <Grid item xs={xs}>
            {children}
        </Grid>
    )
}

export default MaterialsToolbar
