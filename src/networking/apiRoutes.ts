import { readonly } from '../utils/object'

const apiRoutes = {
    sauna: {
        list: '/saunas',
        get: (id: number) => `/sauna/${id}`,
        add: '/sauna/add',
        edit: '/sauna/edit',
        remove: '/sauna/remove',
    },
}

export default readonly(apiRoutes)
