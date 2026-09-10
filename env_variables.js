const BIND = process.env.BIND || "local";
const buildVersion = "1";
const appName = 'JAWS Internal'

const configs = {
    local: {
        // JAWS API (Jaws.Api). Use the http profile for simple local dev.
        baseUrl: 'http://localhost:5210/',
        baseWebsite: 'http://localhost:3000/',
        routerBase: '/'
    },
    dev: {
        baseUrl: 'https://pascoatworktst.pascocountyfl.lan/jawsapi/',
        baseWebsite: 'https://pascoatworktst.pascocountyfl.lan/jawsinternal/',
        routerBase: '/jawsinternal/'
    },
    qa: {
        baseUrl: 'https://pascoatworkqa.pascocountyfl.lan/jawsapi/',
        baseWebsite: 'https://pascoatworkqa.pascocountyfl.lan/jawsinternal/',
        routerBase: '/jawsinternal/'
    },
    prod: {
        baseUrl: 'https://pascoatwork.pascocountyfl.lan/jawsapi/',
        baseWebsite: 'https://pascoatwork.pascocountyfl.lan/jawsinternal/',
        routerBase: '/jawsinternal/'
    }
}[BIND]

// global to all environments
configs.localStorageKey = BIND + '-' + appName
configs.appName = appName
configs.BIND = BIND
configs.buildVersion = buildVersion
configs.loginPath = '/account/login'
configs.notHasPath = '/home'
configs.sessionMinutes = 60
configs.sessionMinutesWarning = 5
configs.version = '1.0'
configs.allowForgotPassword = false
configs.allowRegister = false
configs.showFooter = false
configs.tokenKey = 'jaws-int-token'
configs.userKey = 'jaws-int-user'
configs.drawerImage = true

export default configs