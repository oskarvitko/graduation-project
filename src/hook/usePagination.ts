import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function usePagination<Type>(
    items: Type[],
    pageNumber: number,
    itemsPerPage: number
) {
    const [paginatedItems, setPaginatedItems] = useState<Type[]>([])
    const location = useLocation()

    useEffect(() => {
        const start = (pageNumber - 1) * itemsPerPage
        const end = pageNumber * itemsPerPage

        setPaginatedItems(items.slice(start, end))
    }, [items, pageNumber, location.pathname])

    return paginatedItems
}

export default usePagination
