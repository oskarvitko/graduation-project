import { useGetUserByTokenQuery } from 'api/userApi'

const useRole = () => {
    const { data: user } = useGetUserByTokenQuery()

    const hasRole = (_role: string) => _role === user?.role

    const hasOneOfRoles = (roles: string[]) =>
        roles.find((_role) => _role === user?.role)

    return {
        role: user?.role,
        hasRole,
        hasOneOfRoles,
    }
}

export default useRole
