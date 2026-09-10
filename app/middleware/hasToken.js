import { defineNuxtRouteMiddleware, useRuntimeConfig } from '#app'
import tokenService from '../services/common/tokenService'

export default defineNuxtRouteMiddleware((to, from) => {
    if (!tokenService.hasValidToken()) {
        return navigateTo(useRuntimeConfig().public.loginPath)
    }
})
