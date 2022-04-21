import { Id } from '../utils/identifiable'
import { readonly } from '../utils/object'

const apiRoutes = {
    greeting: (name: string) => `/greeting/${name}`,
    sauna: {
        list: '/saunas',
        get: (id: Id) => `/sauna/${id}`,
        add: '/sauna',
        edit: (id: Id) => `/sauna/edit/${id}`,
        remove: (id: Id) => `/sauna/remove/${id}`,
    },
}

export default readonly(apiRoutes)
