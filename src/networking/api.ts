import sauna, { SaunaAPI } from './api/sauna'
import saunaImages, { SaunaImageAPI } from './api/saunaImages'
import { readonly } from '../utils/object'

const api = {
    sauna,
    saunaImages,
}

export default readonly(api)

export function mockSaunaAPI<T extends SaunaAPI>(mockApi: T): T {
    api.sauna = mockApi
    return mockApi
}

export function mockSaunaImageAPI<T extends SaunaImageAPI>(mockApi: T): T {
    api.saunaImages = mockApi
    return mockApi
}
