import envVariables from '../../../env_variables.js'

const localStorageService = {
    getData(key) {
        const value = localStorage.getItem(envVariables.localStorageKey + '-' + key);
        return value && JSON.parse(value);
    },
    clearData(key) {
        localStorage.removeItem(envVariables.localStorageKey + '-' + key);
    },
    setData(name, value, key) {
        let storedValues = this.getData(key);
        if (!storedValues) { storedValues = {} }
        storedValues[name] = value

        localStorage.setItem(envVariables.localStorageKey + '-' + key, JSON.stringify(storedValues));
    },
    clearAllData() {
        const arr = []
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).substring(0, envVariables.localStorageKey.length) === envVariables.localStorageKey) {
                arr.push(localStorage.key(i))
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === envVariables.localStorageKey + '-siteSettings') {
                continue
            }
            localStorage.removeItem(arr[i])
        }
    }
}

export default localStorageService
