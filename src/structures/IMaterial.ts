import { BookmarkType } from 'api/materialApi'
import { IRating } from './IRating'

export interface IMaterial {
    bookmark: BookmarkType | null
    materialRating: IRating | null
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
