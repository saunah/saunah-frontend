import { Moment } from 'moment'
import { Booking } from './Booking'
import { CheckableNumber } from './CheckableNumber'
import { ModifiableDate } from './ModifiableDate'
import { Price } from './Price'
import { Sauna } from './Sauna'

export namespace Receipt {
    export type Response = {
        booked: {
            duration: number
            transportService: number
            saunahImp: number
            handTowel: number
            wood: number
            washService: boolean
            deposit: boolean
            discount: number
        }
        prices: {
            hourlyRate: number
            transportService: number
            saunahImp: number
            handTowel: number
            wood: number
            washService: number
            deposit: number
        }
    }

    function calculateDuration(start: Moment, end: Moment): number {
        return Math.max((end.unix() - start.unix()) / 3600, 0)
    }

    export function mapFromRequest(booking: Booking.Request, sauna: Sauna.Response, price: Price.Response): Response {
        const start = ModifiableDate.mapToMoment(booking.startBookingDate)
        const end = ModifiableDate.mapToMoment(booking.endBookingDate)
        const duration = start && end ? calculateDuration(start, end) : 0

        return {
            booked: {
                duration,
                transportService: CheckableNumber.mapToNumber(booking.transportService) || 0,
                saunahImp: CheckableNumber.mapToNumber(booking.saunahImp) || 0,
                handTowel: CheckableNumber.mapToNumber(booking.handTowel) || 0,
                wood: CheckableNumber.mapToNumber(booking.wood) || 0,
                washService: booking.washService,
                deposit: booking.deposit,
                discount: booking.discount || 0,
            },
            prices: {
                hourlyRate: sauna.price,
                ...price,
            },
        }
    }

    export function mapFromResponse(booking: Booking.Response): Response {
        const duration = calculateDuration(booking.startBookingDate, booking.endBookingDate)

        return {
            booked: {
                duration,
                ...booking.extras,
                discount: booking.discount || 0,
            },
            prices: {
                hourlyRate: booking.sauna.price,
                ...booking.price,
            },
        }
    }

    export function calculateTotal(receipt: Receipt.Response): number {
        let total = receipt.booked.duration * receipt.prices.hourlyRate
        total += receipt.booked.transportService * receipt.prices.transportService
        total += receipt.booked.saunahImp * receipt.prices.saunahImp
        total += receipt.booked.handTowel * receipt.prices.handTowel
        total += receipt.booked.wood * receipt.prices.wood
        total += receipt.booked.washService ? receipt.prices.washService : 0
        total += receipt.booked.deposit ? receipt.prices.deposit : 0
        total -= receipt.booked.discount
        return total
    }
}
