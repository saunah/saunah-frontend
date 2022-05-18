import { BookingState, trslBookingState } from './BookingState'

describe('BookingState', () => {
    test('translations are correct', () => {
        expect(trslBookingState(BookingState.APPROVED)).toBe('Bestätigt')
        expect(trslBookingState(BookingState.OPENED)).toBe('Offen')
        expect(trslBookingState(BookingState.CANCELED)).toBe('Storniert')
    })
})
