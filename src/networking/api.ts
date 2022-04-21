import greeting, { GreetingAPI } from './api/greeting'
import sauna, { SaunaAPI } from './api/sauna'
import { readonly } from '../utils/object'

const api = {
    greeting,
    sauna,
}

export default readonly(api)

export function mockGreetingAPI<T extends GreetingAPI>(mockApi: T): T {
    api.greeting = mockApi
    return mockApi
}

export function mockSaunaAPI<T extends SaunaAPI>(mockApi: T): T {
    api.sauna = mockApi
    return mockApi
}
