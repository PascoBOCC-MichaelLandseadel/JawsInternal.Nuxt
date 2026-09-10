// plugins/axios.js
import axios from 'axios'
import tokenService from '../services/common/tokenService.js'
export default defineNuxtPlugin((nuxtApp) => {
    const instance = axios.create({
        baseURL: nuxtApp.$config.public.baseUrl,
        withCredentials: true
    })

    instance.interceptors.request.use((config) => {
        const token = tokenService.getToken()
        config.headers.Authorization = `Bearer ${tokenService.getToken()}`
        return config
    })

    nuxtApp.provide('axios', instance)
})
