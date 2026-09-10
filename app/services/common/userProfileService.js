import { useRuntimeConfig } from "#app";
import localStorageService from "./localStorageService.js";
import tokenService from "./tokenService.js";

const userProfileService = {
    setProfile(response) {
        if (tokenService.hasValidToken() === false) { return }
        localStorageService.setData('user', response, useRuntimeConfig().public.userKey)
    },

    getProfile() {
        if (tokenService.hasValidToken() === false) { return null }
        return localStorageService.getData(useRuntimeConfig().public.userKey)
    },

    getUserName() {
        try { return this.getProfile().user.username } catch { return '' }
    },

    getName() {
        // JAWS login returns username only (display name can come from AD later).
        return this.getUserName()
    },

    getRoles() {
        try { return this.getProfile().user.roles || [] } catch { return [] }
    },

    // Role-based check (JAWS uses roles, not permissions).
    canHas(roleName) {
        try { return this.getRoles().some(r => r === roleName) } catch { return false }
    }
}

export default userProfileService