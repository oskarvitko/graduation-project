import { Divider, List, Typography } from '@mui/material'
import { useLazyGetMaterialsQuery } from 'api/materialApi'
import React, { useEffect, useState } from 'react'
import MaterialItem from './MaterialItem'
import { IMaterial } from 'structures/IMaterial'
import Pagination from './Pagination'
import { Box } from '@mui/system'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import usePagination from 'hook/usePagination'
import useSort from 'hook/useSort'
import useFilter from 'hook/useFilter'
import MaterialsToolbar from './MaterialsToolbar/MaterialsToolbar'
import { useAppSelector } from 'hook/redux'

export type modeType = 'bookmarks' | undefined

type MaterialsProps = {
    mode?: modeType
}

const Materials: React.FC<MaterialsProps> = ({ mode }) => {
    const [toolbarLoading, setToolbarLoading] = useState(true)
    const [loading, setLoading] = useState(true)
    const [fetchMaterials, { data: materials, isLoading }] =
        useLazyGetMaterialsQuery()

    const filteredMaterials = useFilter(materials, mode, setLoading)

    const { field, sort, getValues } = useAppSelector(
        (state) => state.materialSort
    )
    const sortedMaterials = useSort<IMaterial>(
        filteredMaterials,
        field,
        sort,
        getValues
    )

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
                setLoading={setToolbarLoading}
            />
            <Divider sx={{ my: 1 }} />
            <Box
                sx={{
                    height: '69.9vh',
                    overflowY: 'auto',
                }}
            >
                {isLoading || loading ? (
                    <AppCircleLoader size={50} />
                ) : (
                    <>
                        {paginatedMaterials?.length ? (
                            <List>
                                {paginatedMaterials?.map((material) => (
                                    <MaterialItem
                                        key={material.id}
                                        item={material}
                                        mode={mode}
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
                total={Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE)}
                setPage={changePagination}
                disabled={isLoading || loading}
            />
        </>
    )
}

export default Materials
