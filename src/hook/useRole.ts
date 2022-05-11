import { useAppSelector } from './redux'

const useRole = () => {
    const { role } = useAppSelector((state) => state.user)

    const hasRole = (_role: string) => _role === role

    const hasOneOfRoles = (roles: string[]) =>
        roles.find((_role) => _role === role)

    return {
        role,
        hasRole,
        hasOneOfRoles,
    }
}

export default useRole
