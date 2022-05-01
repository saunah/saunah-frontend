import { readonly } from '../utils/object'

const apiRoutes = {
    sauna: {
        list: '/saunas',
        get: (id: number) => `/sauna/${id}`,
        add: '/sauna/add',
        edit: '/sauna/edit',
        remove: '/sauna/remove',
    },
    saunaImages: {
        list: (saunaId: number) => `/sauna/${saunaId}/images`,
        get: (imageName: string) => `sauna/images/${imageName}`,
        add: (saunaId: number) => `/sauna/${saunaId}/addImage`,
        remove: (imageId: number) => `sauna/images/${imageId}`,
    },
}

export default readonly(apiRoutes)
