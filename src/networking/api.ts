import sauna, { SaunaAPI } from './api/sauna'
import { readonly } from '../utils/object'
import user, { UserAPI } from './api/user'
const api = {
    sauna,
    user,
}

export default readonly(api)

export function mockSaunaAPI<T extends SaunaAPI>(mockApi: T): T {
    api.sauna = mockApi
    return mockApi
}

export function mockUserAPI<T extends UserAPI>(mockApi: T): T {
    api.user = user
    return mockApi
}
