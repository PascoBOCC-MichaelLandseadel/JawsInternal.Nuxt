import axiosService from '../../services/common/axiosService'
import tokenService from '../../services/common/tokenService'
import userProfileService from '../../services/common/userProfileService'

const accountService = {
    // JAWS login: POST /Account/Login -> { token, username, expiresUtc, roles }
    async login(loginInfo) {
        const response = await axiosService.post('/Account/Login', {
            username: loginInfo.username,
            password: loginInfo.password
        })
        tokenService.setToken(response.token, response.expiresUtc)
        userProfileService.setProfile(response)
        return response
    },

    // Confirm current identity/roles: GET /Account/Me
    async me() {
        return await axiosService.get('/Account/Me')
    }
}

export default accountService