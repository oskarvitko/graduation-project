// import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
// import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { modeType } from 'pages/materials/Materials'
import { materialTypes } from '../constants'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IMaterial } from 'structures/IMaterial'
import { useAppSelector } from './redux'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { useGetAllSubjectsQuery } from 'api/subjectApi'
import { useGetUserByTokenQuery } from 'api/userApi'

function useFilter(
    items: IMaterial[] | undefined,
    mode: modeType,
    setLoading: (value: boolean) => void
): IMaterial[] {
    const [filteredItems, setFilteredItems] = useState<IMaterial[]>([])
    const location = useLocation()

    const options = useAppSelector((state) => state.filter)

    const { data: user } = useGetUserByTokenQuery()
    const { data: subjects } = useGetAllSubjectsQuery(user?.id || '')
    const { data: specialties } = useGetAllSpecialtiesQuery(user?.id || '')

    function filter(items: IMaterial[]): IMaterial[] {
        let filtered = [...items]

        if (options.materialType.length !== materialTypes.length)
            filtered = filtered.filter((item) => {
                for (const type of options.materialType) {
                    if (item.materialType.includes(type)) return true
                }

                return false
            })

        if (mode === 'bookmarks')
            filtered = filtered.filter((item) => item.bookmark?.isBookmark)

        if (options.materialName)
            filtered = filtered.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(options.materialName.toLocaleLowerCase())
            )

        if (options.specialtyId && specialties)
            filtered = filtered.filter((item) => {
                const specialty = specialties.find(
                    (specialty) => specialty.id === options.specialtyId
                )
                if (specialty) {
                    for (let material of specialty.materials) {
                        if (material.id === item.id) {
                            return true
                        }
                    }
                }

                return false
            })

        if (options.subjects && subjects) {
            filtered = filtered.filter((item) => {
                for (const subject of subjects) {
                    if (subject.id.toString() === options.subjects)
                        for (const material of subject.materials) {
                            if (material.id === item.id) return true
                        }
                }

                return false
            })
        }

        if (options.rating) {
            filtered = filtered.filter(
                (item) =>
                    (item.materialRating?.averageRating || 0) >= options.rating
            )
        }

        return filtered
    }

    useEffect(() => {
        if (!items) return setFilteredItems([])

        setLoading(true)
        const timeout = setTimeout(() => {
            setFilteredItems(filter(items))
            setLoading(false)
        }, 400)

        return () => clearTimeout(timeout)
    }, [items, options, location.pathname])

    return filteredItems
}

export default useFilter
