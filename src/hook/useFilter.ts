// import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
// import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { modeType } from 'pages/materials/Materials'
import { materialTypes } from '../constants'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IMaterial } from 'structures/IMaterial'
import { useAppSelector } from './redux'

function useFilter(
    items: IMaterial[] | undefined,
    mode: modeType,
    setLoading: (value: boolean) => void
): IMaterial[] {
    const [filteredItems, setFilteredItems] = useState<IMaterial[]>([])
    const location = useLocation()

    const options = useAppSelector((state) => state.filter)

    // const { data: categories, isLoading: categoriesLoading } =
    //     useGetMaterialCategoriesQuery('')
    // const { data: specialties, isLoading: specialtyLoading } =
    //     useGetAllSpecialtiesQuery('')

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

        // if (options.specialtyId && specialties) filtered =filtered.filter (item => item.)

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
