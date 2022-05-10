import { useSelector } from 'react-redux'

const useRole = () => {
    const { role } = useSelector((state) => state.user)

    const hasRole = (_role) => _role === role

    const hasOneOfRoles = (roles) => roles.find((_role) => _role === role)

    return {
        role,
        hasRole,
        hasOneOfRoles,
    }
}

export default useRole
