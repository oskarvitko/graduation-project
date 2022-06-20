type RolesType = {
    [key: string]: string
}
export const ROLES: RolesType = {
    ADMIN: 'Admin',
    TEACHER: 'Teacher',
    STUDENT: 'Student',
    MODERATOR: 'Moderator',
}

type RouteType = {
    [key: string]: {
        path: string
        text: string
    }
}
export const ROUTES: RouteType = {
    home: {
        path: '/',
        text: 'Главная',
    },
    materials: {
        path: '/materials',
        text: 'Учебные издания',
    },
    profile: {
        path: '/profile',
        text: 'Профиль',
    },
    bookmarks: {
        path: '/bookmarks',
        text: 'Избранное',
    },
    authorMaterials: {
        path: '/author-materials',
        text: 'Мои издания',
    },
    addMaterial: {
        path: '/add-material',
        text: 'Добававить материал',
    },
    material: {
        path: '/material',
        text: 'Учебные издания',
    },
}

export const materialTypes: string[] = [
    'docx',
    'pdf',
    'ppt',
    'xlsx',
    'external_resource',
]
