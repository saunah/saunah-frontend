import { readonly } from '../utils/object'

const apiRoutes = {
    greeting: (name: string) => `/greeting/${name}`,
    user: {
        signup: `/signup`,
    },
}

export default readonly(apiRoutes)
