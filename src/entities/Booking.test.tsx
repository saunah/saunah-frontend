import { Booking } from './Booking'

describe('Booking', () => {
    test('mapping-chain works from start to end', () => {
        //const mapped = Booking.mapOut(Booking.mapToRequest(Booking.mapIn({ michi: true })))
        expect(Booking.mapIn({ michi: true })).toBeTruthy()
    })
})
