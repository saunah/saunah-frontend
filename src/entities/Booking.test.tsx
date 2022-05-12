import { Booking } from './Booking'

const testRemoteResponse: Booking.RemoteResponse = {
    id: 12,
    startBookingDate: '2022-05-12T13:15:42.699Z',
    endBookingDate: '2022-05-12T13:15:42.699Z',
    creation: '2022-05-12T13:15:42.699Z',
    state: 'OPENED',
    endPrice: 500,
    userId: 8,
    saunaId: 12,
    location: 'Winterthur',
    transportService: true,
    washService: true,
    saunahImp: true,
    deposit: true,
    handTowel: true,
    wood: true,
    saunaDescription: 'Nice Sauna',
    saunaIsMobile: true,
    saunaPrice: 250,
    saunaMaxTemp: 90,
    saunaNumberOfPeople: 11,
    saunaLocation: 'location',
    saunaStreet: 'street',
    saunaZip: 8400,
    saunaType: 'mobile',
}

describe('Booking', () => {
    test('remoteResponse works correctly', () => {
        expect(Booking.isRemoteResponse(testRemoteResponse)).toBe(true)
        expect(Booking.isRemoteResponse(null)).toBe(false)
        expect(Booking.isRemoteResponse({})).toBe(false)
        Object.keys(testRemoteResponse).forEach(key => {
            expect(Booking.isRemoteResponse({ ...testRemoteResponse, [key]: undefined })).toBe(false)
        })
    })

    test('mapIn only works with correct input entity', () => {
        expect(Booking.mapIn(testRemoteResponse)).toBeTruthy()
        expect(() => Booking.mapIn({})).toThrow()
    })

    test('emptyRequest() returns object with only falsy values', () => {
        Object.values(Booking.emptyRequest()).forEach(value => {
            expect(value).toBeFalsy()
        })
    })

    test('mapping-chain works from start to end', () => {
        const mapped = Booking.mapOut(Booking.mapToRequest(Booking.mapIn(testRemoteResponse)))
        expect(mapped).toBeTruthy()
    })
})
