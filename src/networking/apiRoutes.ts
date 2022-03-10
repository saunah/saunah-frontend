import { readonly } from '../utils/object'

const apiRoutes = {
    greeting: (name: string) => `/greeting/${name}`,
}

export default readonly(apiRoutes)
