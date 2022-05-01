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
        remove: (imageId: number) => `sauna/images/remove/${imageId}`,
    },
}

/**
 * Prefixes the provided route with root url.
 * @param route the route to prefix
 * @returns the absolute url
 */
export function getAbsoluteUrl(route: string): string {
    return new URL(route, process.env.REACT_APP_API_BASE_URL).toString()
}

export default readonly(apiRoutes)
