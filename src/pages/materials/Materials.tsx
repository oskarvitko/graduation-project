import { Divider, List, Typography } from '@mui/material'
import { useGetMaterialsQuery } from 'api/materialApi'
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
import { useGetUserByTokenQuery } from 'api/userApi'

export type modeType = 'bookmarks' | 'materials'

type MaterialsProps = {
    mode?: modeType
}

const Materials: React.FC<MaterialsProps> = ({ mode = 'materials' }) => {
    const [toolbarLoading, setToolbarLoading] = useState(true)
    const [loading, setLoading] = useState(true)
    const { data: user } = useGetUserByTokenQuery()
    const {
        data: materials,
        isLoading,
        refetch,
    } = useGetMaterialsQuery(user?.id || '', {
        skip: toolbarLoading,
    })

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
        setPage(1)
    }, [materials])

    const changePagination = (page: number) => setPage(page)

    return (
        <>
            <MaterialsToolbar
                refetchMaterials={refetch}
                disabled={isLoading}
                setLoading={setToolbarLoading}
                mode={mode}
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
                            <List sx={{ py: 0 }}>
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
