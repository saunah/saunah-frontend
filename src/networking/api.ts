import greeting, { GreetingAPI } from './api/greeting'
import { readonly } from '../utils/object'

const api = {
    greeting,
}

export default readonly(api)

export function mockGreetingAPI<T extends GreetingAPI>(mockApi: T): T {
    api.greeting = mockApi
    return mockApi
}
