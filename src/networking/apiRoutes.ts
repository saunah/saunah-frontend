import { readonly } from '../utils/object'

const apiRoutes = {
    sauna: {
        list: '/saunas',
        get: (id: number) => `/sauna/${id}`,
        add: '/sauna/add',
        edit: (id: number) => `/sauna/edit/${id}`,
        remove: (id: number) => `/sauna/remove/${id}`,
    },
}

export default readonly(apiRoutes)
