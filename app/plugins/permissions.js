import userProfileService from "../services/common/userProfileService.js"

export default defineNuxtPlugin((nuxtApp) => {

    const canHas = (permissionName) => {
        return userProfileService.canHas(permissionName)
    }

    nuxtApp.provide('canHas', canHas)
})
