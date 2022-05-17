import { allBookingStates, BookingState } from './BookingState'

/**
 * This namespace represents the booking types
 * from the backend. It is a seperate file
 * as those types are huuuge.
 */
export namespace BookingRemote {
    type PriceResponse = {
        id: number
        transportServicePrice: number
        washServicePrice: number
        saunahImpPrice: number
        depositPrice: number
        handTowelPrice: number
        woodPrice: number
    }

    function isPriceResponse(object: unknown): object is PriceResponse {
        const price = object as PriceResponse

        return (
            price != null &&
            typeof price.id === 'number' &&
            typeof price.transportServicePrice === 'number' &&
            typeof price.washServicePrice === 'number' &&
            typeof price.saunahImpPrice === 'number' &&
            typeof price.depositPrice === 'number' &&
            typeof price.handTowelPrice === 'number' &&
            typeof price.woodPrice === 'number'
        )
    }

    type SaunaResponse = {
        id: number
        saunaId: number
        saunaName: string
        saunaDescription: string
        saunaIsMobile: boolean
        saunaPrice: number
        saunaMaxTemp: number
        saunaNumberOfPeople: number
        saunaLocation: string
        saunaStreet: string
        saunaZip: number
        saunaType: string
    }

    function isSaunaResponse(object: unknown): object is SaunaResponse {
        const sauna = object as SaunaResponse

        return (
            sauna != null &&
            typeof sauna.id === 'number' &&
            typeof sauna.saunaId === 'number' &&
            typeof sauna.saunaName === 'string' &&
            typeof sauna.saunaDescription === 'string' &&
            typeof sauna.saunaIsMobile === 'boolean' &&
            typeof sauna.saunaPrice === 'number' &&
            typeof sauna.saunaMaxTemp === 'number' &&
            typeof sauna.saunaNumberOfPeople === 'number' &&
            typeof sauna.saunaLocation === 'string' &&
            typeof sauna.saunaStreet === 'string' &&
            typeof sauna.saunaZip === 'number' &&
            typeof sauna.saunaType === 'string'
        )
    }

    export type Response = {
        price: PriceResponse
        sauna: SaunaResponse
        id: number
        startBookingDate: string
        endBookingDate: string
        creation: string
        state: BookingState
        userId: number
        location: string
        transportServiceDistance: number
        washService: boolean
        saunahImpAmount: number
        deposit: boolean
        handTowelAmount: number
        woodAmount: number
        endPrice: number
        comment: string | null
        discount: number | null
        discountDescription: string | null
    }

    export function isResponse(object: unknown): object is Response {
        const booking = object as Response
        return (
            booking != null &&
            isPriceResponse(booking.price) &&
            isSaunaResponse(booking.sauna) &&
            typeof booking.id === 'number' &&
            typeof booking.startBookingDate === 'string' &&
            typeof booking.endBookingDate === 'string' &&
            typeof booking.creation === 'string' &&
            allBookingStates.includes(booking.state) &&
            typeof booking.userId === 'number' &&
            typeof booking.location === 'string' &&
            typeof booking.transportServiceDistance === 'number' &&
            typeof booking.washService === 'boolean' &&
            typeof booking.saunahImpAmount === 'number' &&
            typeof booking.deposit === 'boolean' &&
            typeof booking.handTowelAmount === 'number' &&
            typeof booking.woodAmount === 'number' &&
            typeof booking.endPrice === 'number' &&
            (booking.comment == null || typeof booking.comment === 'string') &&
            (booking.discount == null || typeof booking.discount === 'number') &&
            (booking.discountDescription == null || typeof booking.discountDescription === 'string')
        )
    }

    export type Request = {
        saunaId: number
        startBookingDate: string
        endBookingDate: string
        location: string
        transportServiceDistance: number
        washService: boolean
        saunahImpAmount: number
        handTowelAmount: number
        woodAmount: number
        comment: string | null
        discount: number | null
        discountDescription: string | null
        deposit: boolean
    }
}
