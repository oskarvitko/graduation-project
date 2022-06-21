import { useEffect, useState } from 'react'

function useSort<Type>(
    items: Type[],
    field: keyof Type,
    sort: 'ASC' | 'DESC',
    getValues?: (a: Type, b: Type) => [any, any]
) {
    const [sortedItems, setSortedItems] = useState<Type[]>([])

    useEffect(() => {
        if (!items) return setSortedItems([])

        let sorted: Type[] = [...items]

        switch (typeof field) {
            case 'string':
                sorted = sorted.sort((a, b) => {
                    const [first, second] = getValuesFromObject(a, b)
                    if (first < second) return -1
                    if (first > second) return 1
                    return 0
                })
                break

            case 'number':
                sorted = sorted.sort((a, b) => {
                    const [first, second] = getValuesFromObject(a, b)

                    return Number(first) - Number(second)
                })
        }

        function getValuesFromObject(a: Type, b: Type) {
            let first = a[field]
            let second = b[field]

            if (getValues) {
                first = getValues(a, b)[0]
                second = getValues(a, b)[1]
            }

            return [first, second]
        }

        if (sort === 'DESC') sorted = sorted.reverse()

        setSortedItems(sorted)
    }, [items, field, sort])

    return sortedItems
}

export default useSort
