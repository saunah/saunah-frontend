import { BookingState } from './BookingState'

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
