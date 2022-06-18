// import { useGetMaterialCategoriesQuery } from 'api/categoryApi'
// import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { MaterialFilterType } from 'pages/materials/MaterialsToolbar/MaterialsToolbar'
import { useEffect, useState } from 'react'
import { IMaterial } from 'structures/IMaterial'

const useFilter = (
    items: IMaterial[] | undefined,
    options: MaterialFilterType
) => {
    const [filteredItems, setFilteredItems] = useState<IMaterial[]>()

    // const { data: categories, isLoading: categoriesLoading } =
    //     useGetMaterialCategoriesQuery('')
    // const { data: specialties, isLoading: specialtyLoading } =
    //     useGetAllSpecialtiesQuery('')

    function filter(items: IMaterial[]): IMaterial[] {
        let filtered = [...items]

        if (options.materialName)
            filtered = filtered.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(options.materialName.toLocaleLowerCase())
            )

        if (options.materialType)
            filtered = filtered.filter((item) =>
                item.materialType.includes(options.materialType as string)
            )

        // if (options.specialtyId && specialties) filtered =filtered.filter (item => item.)

        return filtered
    }

    useEffect(() => {
        if (!items) return setFilteredItems([])

        setFilteredItems(filter(items))
    }, [items, options])

    return filteredItems
}

export default useFilter
