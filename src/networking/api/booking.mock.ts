import moment from 'moment'
import { Booking } from '../../entities/Booking'
import { BookingState } from '../../entities/BookingState'
import { PriceMock } from './price.mock'
import { SaunaMock } from './sauna.mock'

export namespace BookingMock {
    export function simpleMock(config?: {
        listAll?: Booking.Response[]
        list?: Booking.Response[]
        get?: Booking.Response
        add?: Booking.Response
        edit?: Booking.Response
    }) {
        return {
            listAll: jest.fn(() => Promise.resolve(config?.listAll || [sampleResponse1])),
            list: jest.fn(() => Promise.resolve(config?.list || [sampleResponse1])),
            get: jest.fn(() => Promise.resolve(config?.get || sampleResponse1)),
            add: jest.fn(() => Promise.resolve(config?.add || sampleResponse1)),
            edit: jest.fn(() => Promise.resolve(config?.edit || sampleResponse1)),
            approve: jest.fn(() => Promise.resolve()),
            cancel: jest.fn(() => Promise.resolve()),
        }
    }

    export const sampleResponse1: Booking.Response = {
        id: 1,
        userId: 2,
        creation: moment(),
        state: BookingState.APPROVED,
        endPrice: 100,
        sauna: SaunaMock.sampleResponse1,
        price: PriceMock.sampleResponse1,
        extras: {
            washService: true,
            transportService: 30,
            saunahImp: 2,
            handTowel: 0,
            wood: 0,
            deposit: true,
        },
        startBookingDate: moment().add(1, 'day'),
        endBookingDate: moment().add(2, 'days'),
        location: '8400 Winterthur',
        discount: 30,
        discountDescription: '20% Mitglieder-Rabatt',
        comment: 'Cool, ich freue mich.',
    }

    export function getSampleResponse(): Booking.Response {
        // set all moment dates new, so the locale is correct
        const response = sampleResponse1
        response.startBookingDate = moment().add(1, 'day')
        response.endBookingDate = moment().add(2, 'days')
        response.creation = moment()
        return response
    }
}
