import {$host, $authHost} from './index'

export const createQuestion = async (question) => {
    const {data} = await $authHost.post('api/question', question)
    return data
}

export const updateQuestion = async (id, question) => {
    const {data} = await $authHost.put(`api/question/${id}`, question)
    return data
}

export const deleteQuestion = async (id) => {
    const {data} = await $authHost.delete(`api/question/${id}`)
    return data
}

export const fetchQuestions = async (testId) => {
    const {data} = await $host.get('api/question', {params: {testId}})
    return data
}

export const fetchOneQuestion = async (id) => {
    const {data} = await $host.get(`api/question/${id}`)
    return data
}



