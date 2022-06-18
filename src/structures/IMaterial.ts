export interface IMaterial {
    bookmark: boolean
    materialRating: {
        id: number
        userId: string
        userRating: number
        averageRating: number
        materialId: number
    } | null
    id: number
    teacherUserId: string
    materialCategoryId: number
    fileId: number
    name: string
    createDate: Date
    course: number
    materialType: string
    description: string
}
