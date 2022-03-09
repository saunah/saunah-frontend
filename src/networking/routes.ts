import { readonly } from '../utils/object'

const routes = {
    greeting: (name: string) => `/greeting/${name}`,
}

export default readonly(routes)
