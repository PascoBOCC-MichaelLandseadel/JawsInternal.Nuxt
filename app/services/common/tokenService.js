import { useRuntimeConfig, useRouter } from "#app"
import localStorageService from "./localStorageService.js";

const tokenService = {
    logout() {
        localStorageService.clearAllData()
        useRouter().push({ path: useRuntimeConfig().public.loginPath })
    },

    hasValidToken() {
        const t = this.getToken()
        const e = this.getRefreshTokenExpiration()
        return t && t.length > 0 && new Date() < new Date(e)
    },

    setToken(token, expiration) {
        localStorageService.setData('value', token, useRuntimeConfig().public.tokenKey)
        localStorageService.setData('expiration', expiration, useRuntimeConfig().public.tokenKey)
    },

    getToken() {
        const tokenObj = localStorageService.getData(useRuntimeConfig().public.tokenKey)
        if (!tokenObj || tokenObj.value == null) { return '' }
        return tokenObj.value
    },

    getRefreshTokenExpiration() {
        const tokenObj = localStorageService.getData(useRuntimeConfig().public.tokenKey)
        if (!tokenObj || !tokenObj.expiration) { return '' }
        return tokenObj.expiration
    }
}

export default tokenService