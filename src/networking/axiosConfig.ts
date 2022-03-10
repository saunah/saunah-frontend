import axios from 'axios'

export default function axiosConfig(): void {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

    axios.interceptors.request.use(request => {
        const stringParams = request.params
            ? Object.entries(request.params)
                  .filter(entry => entry[1] !== undefined)
                  .map(entry => ` ${entry[0]}=${entry[1]}`)
            : ''
        const method = request.method?.toUpperCase() || 'UNKNOWN'
        console.debug(`The request ${method} ${request.url}${stringParams} has started.`)
        return request
    })
}
