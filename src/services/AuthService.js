import { API_URL } from "../http"
import axios from 'axios'

class AuthService {

    static async login(login, password) {
        if (login === 'admin' && password === 'admin') {
            return {
                data: {
                    username: 'admin'
                },
                status: 200
            }
        } else {
            return 'Invalid login or password'
        }
        // return axios({
        //     method: 'post',
        //     url: `${API_URL}/login`,
        //     data: {
        //         login,
        //         password
        //     }
        // })
    }

    static async register(data, users) {
        if (users.find(user => user.login === data.login)) {
            return 'Пользователь с таким Login уже существует'
        }
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