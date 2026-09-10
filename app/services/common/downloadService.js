const downloadService = {
    downloadFile (response) {
        const byteCharacters = atob(response.reportDataBlob)

        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray])
        const link = document.createElement('a')

        link.href = window.URL.createObjectURL(blob)
        link.download = response.reportName
        link.click()
        return response.status
    },
    openFileInNewTab (response) {
        const byteCharacters = atob(response.reportDataBlob)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)

        let type = response.reportName.split('.').pop()
        if (type === 'pdf') {
            type = 'application/pdf'
        } else {
            type = 'image/' + type
        }
        const blob = new Blob([byteArray], { type })
        const link = document.createElement('a')

        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        link.click()
    },
    downloadCSV (response) {
        const blob = new Blob([response.reportDataBlob])
        const a = window.document.createElement('a')

        a.href = window.URL.createObjectURL(blob, {
            type: 'text/plain'
        })
        a.download = response.reportName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    },
    showGuide (filename) {
        const config = useRuntimeConfig()

        const link = document.createElement('a')
        link.href = config.public.baseWebsite + filename
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        console.log('Opening guide:', link.href)
        link.click()
    }
}

export default downloadService
