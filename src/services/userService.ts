import api from 'api'

class UserService {
    static async login(email: string, password: string) {
        return api.post('/authenticate/login', { email, password })
    }
}

export default UserService
