import { readonly } from '../utils/object'

const apiRoutes = {
    greeting: (name: string) => `/greeting/${name}`,
    user: {
        login: `/login`,
    }
}

export default readonly(apiRoutes)
