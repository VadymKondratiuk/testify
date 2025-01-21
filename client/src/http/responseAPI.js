import {$host, $authHost} from './index'

export const createResponse = async (response) => {
    const {data} = await $authHost.post('api/response', response)
    return data
}

export const fetchResponses = async (testAttemptId) => {
    const {data} = await $host.get('api/response', {params: {testAttemptId}})
    return data
}

export const fetchOneResponse = async (id) => {
    const {data} = await $host.get(`api/response/${id}`)
    return data
}



