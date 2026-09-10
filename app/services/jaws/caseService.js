import axiosService from '../common/axiosService'

// JAWS Case data access (calls Jaws.Api CasesController).
const caseService = {
    async count() {
        return await axiosService.get('/api/cases/count')
    },

    async search(q, max = 25) {
        return await axiosService.get('/api/cases/search', { q, max })
    },

    async getById(id) {
        return await axiosService.get(`/api/cases/${id}`)
    }
}

export default caseService