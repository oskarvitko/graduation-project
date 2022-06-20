import { IMaterial } from './IMaterial'

export interface ISubject {
    id: number
    name: string
    course: number
    userId: string
    specialtyId: number
    materials: IMaterial[]
}
