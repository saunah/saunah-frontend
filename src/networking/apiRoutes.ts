import { readonly } from '../utils/object'

const apiRoutes = {
    greeting: (name: string) => `/greeting/${name}`,
    user: {
        login: '/login',
        signup: `/signup`,
    },
}



export default readonly(apiRoutes)
