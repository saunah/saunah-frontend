import { BookingRemote } from './BookingRemote'
import { BookingState } from './BookingState'

const sampleResponse: BookingRemote.Response = {
    id: 3,
    startBookingDate: '2022-05-18T10:20:00.000+00:00',
    endBookingDate: '2022-05-18T13:20:00.000+00:00',
    creation: '2022-05-17T21:45:18.689+00:00',
    state: BookingState.CANCELED,
    userId: 1,
    location: 'hallo',
    transportServiceDistance: 10,
    washService: true,
    saunahImpAmount: 4,
    deposit: true,
    handTowelAmount: 2,
    woodAmount: 3,
    comment: 'hallo',
    endPrice: 0,
    discount: 0,
    discountDescription: '',
    price: {
        id: 3,
        transportServicePrice: 8,
        washServicePrice: 9,
        saunahImpPrice: 10,
        depositPrice: 11,
        handTowelPrice: 12,
        woodPrice: 13,
    },
    sauna: {
        id: 3,
        saunaId: 1,
        saunaName: 'Karhu',
        saunaDescription: 'adfj',
        saunaIsMobile: true,
        saunaPrice: 12,
        saunaMaxTemp: 12,
        saunaNumberOfPeople: 12,
        saunaLocation: 'sdf',
        saunaStreet: 'fds',
        saunaZip: 213,
        saunaType: 'dfakjl',
    },
}

const optionalKeys = ['comment', 'discount', 'discountDescription']
describe('BookingRemote', () => {
    test('isResponse() works correctly', () => {
        expect(BookingRemote.isResponse(null)).toBe(false)
        expect(BookingRemote.isResponse({})).toBe(false)
        expect(BookingRemote.isResponse(sampleResponse)).toBe(true)
        Object.keys(sampleResponse).forEach(key =>
            expect(BookingRemote.isResponse({ ...sampleResponse, [key]: null })).toBe(optionalKeys.includes(key))
        )

        Object.keys(sampleResponse.sauna).forEach(key =>
            expect(
                BookingRemote.isResponse({ ...sampleResponse, sauna: { ...sampleResponse.sauna, [key]: null } })
            ).toBe(false)
        )

        Object.keys(sampleResponse.price).forEach(key =>
            expect(
                BookingRemote.isResponse({ ...sampleResponse, price: { ...sampleResponse.price, [key]: null } })
            ).toBe(false)
        )
    })
})
