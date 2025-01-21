import {$host, $authHost} from './index'

export const createAnswer = async (answer) => {
    const {data} = await $authHost.post('api/answer', answer)
    return data
}

export const updateAnswer = async (id, answer) => {
    const {data} = await $authHost.put(`api/answer/${id}`, answer)
    return data
}

export const deleteAnswer = async (id) => {
    const {data} = await $authHost.delete(`api/answer/${id}`)
    return data
}

export const fetchAnswers = async (questionId) => {
    const {data} = await $host.get('api/answer', {params: {questionId}})
    return data
}

export const fetchOneAnswer = async (id) => {
    const {data} = await $host.get(`api/answer/${id}`)
    return data
}
