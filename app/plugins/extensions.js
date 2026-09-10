export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            formatMoney: (money) => {
                return formatMoney(money)
            },
            formatNumberWithCommas: (number) => {
                return formatNumberWithCommas(number)
            },
            isDateValid: (date) => {
                return isDateValid(date);
            },
            formatDateShort: (date) => {
                return formatDateShort(date);
            },
            formatDateTimeShort: (date) => {
                return formatDateTimeShort(date);
            },
            getListOfMonths: () => {
                return getListOfMonths();
            },
            formatParcel: (parcel) => {
                return formatParcel(parcel);
            },
            stripParcel: (parcel) => {
                return stripParcel(parcel);
            },

        }
    }
    // You can add more plugins or extensions here
    function formatMoney(amount) {
        if (!amount) amount = 0
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        return formatter.format(amount)
    }

    function formatNumberWithCommas(number) {
        if (!number) return 0
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    function isDateValid(date) {
        const moment = nuxtApp.$moment
        if (date && moment) {
            const d = moment(date)
            return d.isValid()
        }
        return false
    }

    function formatDateShort(date) {
        const moment = nuxtApp.$moment
        if (isDateValid(date) && moment) {
            return moment(date).format('MM/DD/YYYY')
        }
        return ''
    }

    function formatDateTimeShort(date) {
        const moment = nuxtApp.$moment
        if (isDateValid(date) && moment) {
            return moment(date).format('MM/DD/YYYY hh:mm a')
        }
        return ''
    }

    function getListOfMonths() {
        const moment = nuxtApp.$moment
        const months = moment ? moment.months() : []
        const list = []
        for (let i = 1; i < 13; i++) {
            list.push({ value: i, text: months[i - 1] || '' })
        }
        return list
    }

    function formatParcel(parcel) {
        if (parcel.length !== 19) {
            return parcel
        } else {
            return parcel.substring(0, 2) + '-' + parcel.substring(2, 4) + '-' + parcel.substring(4, 6) + '-' +
                parcel.substring(6, 10) + '-' + parcel.substring(10, 15) + '-' + parcel.substring(15, 19)
        }
    }

    function stripParcel(parcel) {
        if (!parcel) return ''
        return parcel.toString().replace(/-/g, '')
    }

    /*    nuxtApp.vueApp.config.globalProperties.$formatMoney = formatMoney
        nuxtApp.vueApp.config.globalProperties.$formatNumberWithCommas = formatNumberWithCommas
        nuxtApp.vueApp.config.globalProperties.$isDateValid = isDateValid
        nuxtApp.vueApp.config.globalProperties.$formatDateShort = formatDateShort
        nuxtApp.vueApp.config.globalProperties.$formatDateTimeShort = formatDateTimeShort
        nuxtApp.vueApp.config.globalProperties.$getListOfMonths = getListOfMonths
        nuxtApp.vueApp.config.globalProperties.$formatParcel = formatParcel
        nuxtApp.vueApp.config.globalProperties.$stripParcel = stripParcel*/


})
