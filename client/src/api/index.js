import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertData = payload => api.post(`/data`, payload)
export const getAllDatas = () => api.get(`/datas`)
export const updateDataById = (id, payload) => api.put(`/data/${id}`, payload)
export const deleteDataById = id => api.delete(`/data/${id}`)
export const getDataById = id => api.get(`/data/${id}`)

const apis = {
    insertData,
    getAllDatas,
    updateDataById,
    deleteDataById,
    getDataById,
}

export default apis