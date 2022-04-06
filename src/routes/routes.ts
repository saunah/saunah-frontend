import { readonly } from '../utils/object'

export const routes = readonly({
    home: '/',
    login: '/login',
    greeting: (user: string) => `/greeting/${user}`,
})

export const routeParams = readonly({
    user: 'user',
})

export default routes
