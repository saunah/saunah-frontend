import { readonly } from '../utils/object'

const apiRoutes = {
    user: {
        login: '/login',
        signup: '/signup',
        verify: (token: string) => `/verify/${token}`,
        list: '/users',
        get: (userId: number) => `/users/${userId}`,
        edit: (userId: number) => `/users/${userId}`,
        remove: (userId: number) => `/users/${userId}`,
        whoami: '/users/whoami',
        resetPasswordRequest: '/resetPasswordRequest',
        setNewPassword:'/setNewPassword',
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
    price: {
        list: '/prices',
        get: (saunaId: number) => `/prices/${saunaId}`,
        add: '/prices',
        edit: (saunaId: number) => `/prices/${saunaId}`,
        remove: (saunaId: number) => `/prices/${saunaId}`,
    },
    booking: {
        listAll: '/bookings/all',
        list: '/bookings',
        get: (bookingId: number) => `/bookings/${bookingId}`,
        add: '/bookings',
        edit: (bookingId: number) => `/bookings/${bookingId}`,
        approve: (bookingId: number) => `/bookings/${bookingId}/approve`,
        cancel: (bookingId: number) => `/bookings/${bookingId}/cancel`,
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
