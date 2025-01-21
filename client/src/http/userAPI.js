import {$authHost, $host} from './index'
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password, firstName, lastName) => {
    const {data} = await $host.post('api/user/registration', {email, password, firstName, lastName, role: 'USER'})
    localStorage.setItem('token', data.token)

    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)

    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)

    return jwtDecode(data.token)
}

export const fetchUserName = async (id) => {
    const {data} = await $host.get(`api/user/${id}`)
    return data
}

export const updateUser = async (id, user) => {
    const {data} = await $authHost.put(`api/user/${id}`, user)
    return data
}