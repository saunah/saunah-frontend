import sauna, { SaunaAPI } from './api/sauna'
import saunaImages, { SaunaImageAPI } from './api/saunaImages'
import user, { UserAPI } from './api/user'
import price, { PriceAPI } from './api/price'
import { readonly } from '../utils/object'
import booking, { BookingAPI } from './api/booking'
import { BookingMock } from './api/booking.mock'

const api = {
    sauna,
    saunaImages,
    user,
    price,
    booking,
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

export function mockUserAPI<T extends UserAPI>(mockApi: T): T {
    api.user = mockApi
    return mockApi
}

export function mockPriceAPI<T extends PriceAPI>(mockApi: T): T {
    api.price = mockApi
    return mockApi
}

export function mockBookingAPI<T extends BookingAPI>(mockApi: T): T {
    api.booking = mockApi
    return mockApi
}

// TODO: Remove when backend ready
mockBookingAPI(BookingMock.simpleMock())
