import { readonly } from '../utils/object'

const apiRoutes = {
    greeting: (name: string) => `/greeting/${name}`,
    sauna: {
        list: '/saunas',
        get: (id: number) => `/sauna/${id}`,
        add: '/sauna',
        edit: (id: number) => `/sauna/edit/${id}`,
        remove: (id: number) => `/sauna/remove/${id}`,
    },
}

export default readonly(apiRoutes)
