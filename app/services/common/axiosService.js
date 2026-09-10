import { useNuxtApp, useRouter, useRuntimeConfig } from "#imports"
import tokenService from "./tokenService"

const axiosService = {
    async get(relativeUrl, data, alternativeBaseUrl, retry) {
        const { $axios } = useNuxtApp()
        if (!!retry === true && (await this.refresh()) === false) {
            return
        }
        // Build query string if data is provided
        const config = useRuntimeConfig()
        const baseUrl = config.public.baseUrl.replace(/\/+$/, '') // adjust key as needed
        try {
            const res = await $axios.get(relativeUrl, {
                params: data,
                baseURL: alternativeBaseUrl?.replace(/\/+$/, '') || baseUrl,
                withCredentials: !alternativeBaseUrl
            })
            return res.data
        } catch (e) {
            if (
                !!retry === false &&
                e?.response?.status === 401
            ) {
                return axiosService.get(relativeUrl, data, alternativeBaseUrl, true)
            } else {
                throw new Error(e?.response?.data || e.message)
            }
        }

    },

    async post(relativeUrl, data, alternativeBaseUrl, retry) {
        const { $axios } = useNuxtApp()
        if (!!retry === true && (await this.refresh()) === false) {
            return
        }
        const config = useRuntimeConfig()
        const baseUrl = config.public.baseUrl.replace(/\/+$/, '') // adjust key as needed
        try {
            const res = await $axios.post(relativeUrl, data, {
                baseURL: alternativeBaseUrl?.replace(/\/+$/, '') || baseUrl,
                withCredentials: !alternativeBaseUrl,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return res.data
        } catch (e) {
            if (
                !!retry === false &&
                e?.response?.status === 401
            ) {
                return axiosService.post(relativeUrl, data, alternativeBaseUrl?.replace(/\/+$/, ''), true)
            } else {
                throw e
            }
        }
    },

    async put(relativeUrl, data, retry) {
        const { $axios } = useNuxtApp()
        if (!!retry === true && (await this.refresh()) === false) {
            return
        }
        try {
            const res = await $axios.put(relativeUrl, data)
            return res.data
        } catch (e) {
            if (
                !!retry === false &&
                e.response &&
                e.response.status === 401
            ) {
                return axiosService.put(relativeUrl, data, true)
            } else {
                throw new Error(e.response?.data || e.message)
            }
        }
    },

    async delete(relativeUrl, data, retry) {
        const { $axios } = useNuxtApp()
        if (!!retry === true && (await this.refresh()) === false) {
            return
        }
        try {
            const res = await $axios.delete(relativeUrl, { params: data })
            return res.data
        } catch (e) {
            if (
                !!retry === false &&
                e.response &&
                e.response.status === 401
            ) {
                return axiosService.delete(relativeUrl, data, true)
            } else {
                throw new Error(e.response?.data || e.message)
            }
        }
    },

    async refresh() {
        // JAWS uses plain JWT (no refresh endpoint). On expiry/401, log out.
        tokenService.logout()
        return false
    }
}
export default axiosService
