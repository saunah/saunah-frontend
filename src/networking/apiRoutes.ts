import { readonly } from '../utils/object'

const apiRoutes = {
    user: {
        login: '/login',
        signup: `/signup`,
        resetPassword: '/resetPasswordRequest',
    },
    sauna: {
        list: '/saunas',
        get: (saunaId: number) => `/saunas/${saunaId}`,
        add: '/saunas',
        edit: (saunaId: number) => `/saunas/${saunaId}`,
        remove: (saunaId: number) => `/saunas/${saunaId}`,
    },
    saunaImages: {
        list: (saunaId: number) => `/saunas/${saunaId}/images`,
        add: (saunaId: number) => `/saunas/${saunaId}/images`,
        get: (imageName: string) => `saunas/images/${imageName}`,
        remove: (imageId: number) => `saunas/images/${imageId}`,
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
