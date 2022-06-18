import { useEffect, useState } from 'react'

function usePagination<Type>(
    items: Type[],
    pageNumber: number,
    itemsPerPage: number
) {
    const [paginatedItems, setPaginatedItems] = useState<Type[]>([])

    useEffect(() => {
        const start = (pageNumber - 1) * itemsPerPage
        const end = pageNumber * itemsPerPage

        setPaginatedItems(items.slice(start, end))
    }, [items, pageNumber])

    return paginatedItems
}

export default usePagination
