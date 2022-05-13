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

    export function mapFromRequest(booking: Booking.Request, sauna: Sauna.Response, price: Price.Response): Response {
        const start = ModifiableDate.mapToMoment(booking.startBookingDate)
        const end = ModifiableDate.mapToMoment(booking.endBookingDate)
        const duration = start && end ? Math.ceil(((end.unix() - start.unix()) / 3600) * 2) / 2 : 0

        return {
            booked: {
                duration,
                transportService: CheckableNumber.mapToNumber(booking.transportService) || 0,
                saunahImp: CheckableNumber.mapToNumber(booking.saunahImp) || 0,
                handTowel: CheckableNumber.mapToNumber(booking.handTowel) || 0,
                wood: CheckableNumber.mapToNumber(booking.wood) || 0,
                washService: booking.washService,
                deposit: booking.deposit,
            },
            prices: {
                hourlyRate: sauna.price,
                ...price,
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
        return total
    }
}
