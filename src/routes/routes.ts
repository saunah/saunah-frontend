import { readonly } from '../utils/object'

export const routes = readonly({
    home: '/',
    greeting: (user: string) => `/greeting/${user}`,
})

export const routeParams = readonly({
    user: 'user',
})
