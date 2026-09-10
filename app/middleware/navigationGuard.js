// app/middleware/navigationGuard.js
import tokenService from "../services/common/tokenService.js";
import userProfileService from "../services/common/userProfileService.js";
import { joinURL } from 'ufo'
import { createError } from 'h3'

export default defineNuxtRouteMiddleware((to) => {
    const config = useRuntimeConfig()
    const loginPath = config.public.loginPath.replace(/\/+$/, '')

    if(to.fullPath === loginPath) {
        return
    }

    if (to.meta && Object.keys(to.meta).length > 0) {
        if (!tokenService.hasValidToken()) {
            const url = joinURL(config.public.baseWebsite, config.public.loginPath)
            return navigateTo(url, {external: true})
        } else {
            const metaKeys = Object.keys(to.meta)
            if (metaKeys.some(key => userProfileService.canHas(key) === false)) {
                // Return the error instead of throwing
                return navigateTo('/forbidden')
            }
        }
    }
})
