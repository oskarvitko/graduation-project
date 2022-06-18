import { Divider, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import MaterialItem from 'pages/materials/MaterialItem'
import Pagination from 'pages/materials/Pagination'
import React from 'react'
import { IMaterial } from 'structures/IMaterial'

const Bookmarks: React.FC = () => {
    const isLoading = false

    const materials: IMaterial[] = [
        {
            bookmark: true,
            materialRating: null,
            id: 1,
            teacherUserId: 'c6d2acf5-9937-4beb-b941-d241ebf1088f',
            materialCategoryId: 3,
            fileId: 11,
            name: 'C# for beginners',
            createDate: new Date('2022-05-23T21:49:47.5694411'),
            course: 4,
            materialType: 'pptx',
            description: 'feofemfek oweolsfi pfeilskm',
        },
    ]

    return (
        <>
            <Box
                sx={{
                    height: '77vh',
                    overflowY: 'auto',
                }}
            >
                {isLoading ? (
                    <AppCircleLoader size={50} />
                ) : (
                    <>
                        {materials?.length ? (
                            <List>
                                {materials?.map((material) => (
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
                page={1}
                total={1}
                setPage={(f) => f}
                disabled={isLoading}
            />
        </>
    )
}

export default Bookmarks
