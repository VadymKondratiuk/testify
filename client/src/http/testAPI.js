import {$host, $authHost} from './index'

export const createTest = async (test) => {
    const {data} = await $authHost.post('api/test', test)
    return data
}

export const updateTest = async (id, test) => {
    const {data} = await $authHost.put(`api/test/${id}`, test)
    return data
}

export const deleteTest = async (id, test) => {
    const {data} = await $authHost.delete(`api/test/${id}`, test)
    return data
}

export const fetchTests = async (userId) => {
    const {data} = await $host.get('api/test', {params: {userId}})
    return data
}

export const fetchOneTest = async (id) => {
    const {data} = await $host.get(`api/test/${id}`)
    return data
}



