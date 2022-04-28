import greeting, { GreetingAPI } from './api/greeting'
import user, { UserAPI } from './api/user'
import { readonly } from '../utils/object'

const api = {
    greeting,
    user,
}

export default readonly(api)

export function mockGreetingAPI<T extends GreetingAPI>(mockApi: T): T {
    api.greeting = mockApi
    return mockApi
}

export function mockUserAPI<T extends UserAPI>(mockApi: T): T {
    api.user = mockApi
    return mockApi
}
