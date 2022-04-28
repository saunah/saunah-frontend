import { readonly } from '../utils/object'

const apiRoutes = {
    user: {
        login: '/login',
        signup: `/signup`,
    },
    sauna: {
        list: '/saunas',
        get: (id: number) => `/sauna/${id}`,
        add: '/sauna/add',
        edit: '/sauna/edit',
        remove: '/sauna/remove',
    },
}

export default readonly(apiRoutes)
