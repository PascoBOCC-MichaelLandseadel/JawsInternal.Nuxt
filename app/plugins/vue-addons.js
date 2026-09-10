import { defineNuxtPlugin } from "#app"
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import VueTheMask from 'vue-the-mask'
import money3 from 'v-money3'

import customButton from '../components/customButton.vue'
import sweetAlert from '../components/sweetAlert.vue'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        autoClose: 5000,
        position: "bottom-right",
        transition: "slide",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        icon: true,
        rtl: false
    })

    // Input mask (Vue 3 alternative)
    nuxtApp.vueApp.use(VueTheMask)

    // Money input (Vue 3 alternative)
    nuxtApp.vueApp.use(money3, {
        precision: 2,
        prefix: '$ ',
        decimal: '.',
        thousands: ',',
        masked: false
    })

    // Register global components
    nuxtApp.vueApp.component('custom-button', customButton)
    nuxtApp.vueApp.component('sweet-alert', sweetAlert)
})
