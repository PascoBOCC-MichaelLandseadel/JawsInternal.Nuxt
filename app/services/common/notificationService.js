import { toast } from 'vue3-toastify'

const notificationService = () => {
    //const toast = useToast()

    return {
        failed: (error) => {
            toast.error(error?.response?.data?.message || 'An error occurred', {
                autoClose: 5000,
                position: "bottom-right"
            })
        },
        error: (message) => {
            toast.error(message, {
                autoClose: 5000,
                position: "bottom-right"
            })
        },
        warning: (message) => {
            toast.warning(message, {
                autoClose: 5000,
                position: "bottom-right"
            })
        },
        info: (message) => {
            toast.info(message, {
                autoClose: 5000,
                position: "bottom-right"
            })
        },
        success: (message) => {
            toast.success(message, {
                autoClose: 5000,
                position: "bottom-right"
            })
        }
    }
}

export default notificationService
