import sauna, { SaunaAPI } from './api/sauna'
import { readonly } from '../utils/object'

const api = {
    sauna,
}

export default readonly(api)

export function mockSaunaAPI<T extends SaunaAPI>(mockApi: T): T {
    api.sauna = mockApi
    return mockApi
}
