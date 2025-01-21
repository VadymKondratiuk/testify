import {$host, $authHost} from './index'

export const createTestAttempt = async (testAttempt) => {
    const {data} = await $authHost.post('api/testAttempt', testAttempt)
    return data
}

export const updateTestAttempt = async (id, testAttempt) => {
    const {data} = await $authHost.put(`api/testAttempt/${id}`, testAttempt)
    return data
}

// export const deleteQuestion = async (id) => {
//     const {data} = await $authHost.delete(`api/question/${id}`)
//     return data
// }

export const fetchTestAttempts = async (testId, userId) => {
    const {data} = await $host.get('api/testAttempt', {params: {testId, userId}})
    return data
}

export const fetchOneTestAttempt = async (id) => {
    const {data} = await $host.get(`api/testAttempt/${id}`)
    return data
}



