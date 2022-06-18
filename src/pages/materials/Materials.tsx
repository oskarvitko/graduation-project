import { Divider, List, Typography } from '@mui/material'
import { useLazyGetMaterialsQuery } from 'api/materialApi'
import React, { useEffect, useState } from 'react'
import MaterialItem from './MaterialItem'
import { IMaterial } from 'structures/IMaterial'
import Pagination from './Pagination'
import { Box } from '@mui/system'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import MaterialsToolbar, {
    MaterialFilterType,
} from './MaterialsToolbar/MaterialsToolbar'
import usePagination from 'hook/usePagination'
import useSort from 'hook/useSort'
import useFilter from 'hook/useFilter'

const Materials: React.FC = () => {
    const [toolbarLoading, setToolbarLoading] = useState(true)
    const [fetchMaterials, { data: materials, isLoading }] =
        useLazyGetMaterialsQuery()

    const [filter, setFilter] = useState<MaterialFilterType>({
        materialName: '',
        courses: [],
    })
    const filteredMaterials = useFilter(materials, filter)

    const sortedMaterials = useSort<IMaterial>(filteredMaterials, 'name', 'ASC')

    const [page, setPage] = useState(1)

    const ITEMS_PER_PAGE = 5
    const paginatedMaterials = usePagination<IMaterial>(
        sortedMaterials,
        page,
        ITEMS_PER_PAGE
    )

    useEffect(() => {
        if (!toolbarLoading) {
            setPage(1)
            fetchMaterials('')
        }
    }, [toolbarLoading])

    const changePagination = (page: number) => setPage(page)

    return (
        <>
            <MaterialsToolbar
                disabled={isLoading}
                data={materials || []}
                setFilteredData={(f) => f}
                setFilter={setFilter}
                setLoading={setToolbarLoading}
            />
            <Divider sx={{ my: 1 }} />
            <Box
                sx={{
                    height: '69.9vh',
                    overflowY: 'auto',
                }}
            >
                {isLoading ? (
                    <AppCircleLoader size={50} />
                ) : (
                    <>
                        {paginatedMaterials?.length ? (
                            <List>
                                {paginatedMaterials?.map((material) => (
                                    <MaterialItem
                                        key={material.id}
                                        item={material}
                                    />
                                ))}
                            </List>
                        ) : (
                            <Typography
                                variant="h6"
                                sx={{ my: 1 }}
                                align="center"
                            >
                                Материалы не найдены
                            </Typography>
                        )}
                    </>
                )}
            </Box>
            <Divider />
            <Pagination
                page={page}
                total={Math.ceil((materials?.length || 1) / ITEMS_PER_PAGE)}
                setPage={changePagination}
                disabled={isLoading}
            />
        </>
    )
}

export default Materials
