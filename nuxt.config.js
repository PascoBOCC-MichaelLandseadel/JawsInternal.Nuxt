import envVariables from './env_variables.js'

export default defineNuxtConfig({
  ssr: false,
    target: 'static',
    compatibilityDate: '2025-10-06',
  runtimeConfig: {
    public: {
      ...envVariables
    }
  },
  app: {
      baseURL: envVariables.routerBase,
    head: {
        title: envVariables.appName,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/gavel.png' }
        ],
        script: [
            { src: 'https://kit.fontawesome.com/ad112a1d3a.js', crossorigin: 'anonymous' }
        ]
    }
  },
  router: {
          middleware: ['navigationGuard'],
          base: envVariables.routerBase
  },
    layoutTransition: {
        name: 'default',
        mode: 'out-in'
    },
    loading: false,
  css: [
        '@/assets/css/main.scss',
        '@/assets/css/animate.css'
  ],
    plugins: [
        '~/plugins/axios.js',
        '~/plugins/extensions.js',
        '~/plugins/moment.js',
        '~/plugins/permissions.js',
        '~/plugins/vee-validate.js',
        '~/plugins/vue-addons.js',
        '~/plugins/vuetify.js'
    ],
  devtools: { enabled: true },
  modules: ['@nuxt/eslint']
})
