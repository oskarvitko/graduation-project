import { API_URL } from "../http"
import axios from 'axios'

class AuthService {

    static async login(login, password) {
        return axios({
            method: 'post',
            url: `${API_URL}/login`,
            data: {
                login,
                password
            }
        })
    }

    static async registerStudent(login, password, username) {
        return axios({
            method: 'post',
            url: `${API_URL}/registr-stud`,
            data: {
                login,
                password,
                username
            }
        })
    }

    static async registerTeacher(login, password, username) {
        return axios({
            method: 'post',
            url: `${API_URL}/registr-teach`,
            data: {
                login,
                password,
                username
            }
        })
    }

    static async registerAdmin(login, password, username) {
        return axios({
            method: 'post',
            url: `${API_URL}/registr-admin`,
            data: {
                login,
                password,
                username
            }
        })
    }

    static async logout() { }

}

export default AuthService