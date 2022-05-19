import moment, { Moment } from 'moment'
import { MissingPropertyError } from '../utils/Error'
import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { Editable } from '../utils/object'
import { BookingRemote } from './BookingRemote'
import { BookingState } from './BookingState'
import { CheckableNumber } from './CheckableNumber'
import { ModifiableDate } from './ModifiableDate'
import { Price } from './Price'
import { Sauna } from './Sauna'

export namespace Booking {
    type Extras = {
        washService: boolean
        transportService: number
        saunahImp: number
        handTowel: number
        wood: number
        deposit: boolean
    }

    type Base = {
        startBookingDate: Moment
        endBookingDate: Moment
        location: string
        discount: number | null
        discountDescription: string | null
        comment: string | null
    }

    export type Response = {
        userId: number
        creation: Moment
        state: BookingState
        endPrice: number
        sauna: Sauna.Response
        price: Price.Response
        extras: Extras
    } & Base &
        Identifiable

    export type Request = {
        saunaId: number | null
    } & ModifiableDate.Object<Editable<Base>> &
        CheckableNumber.Object<Extras> &
        MaybeIdentifiable

    export function mapIn(booking: unknown): Response {
        if (!BookingRemote.isResponse(booking))
            throw new Error(`Object could not be mapped in. It is not of type RemoteResponse.`)

        return {
            id: booking.id,
            userId: booking.userId,
            creation: moment(booking.creation),
            state: booking.state,
            endPrice: booking.endPrice,
            startBookingDate: moment(booking.startBookingDate),
            endBookingDate: moment(booking.endBookingDate),
            location: booking.location,
            discount: booking.discount,
            discountDescription: booking.discountDescription,
            comment: booking.comment,
            sauna: {
                id: booking.sauna.saunaId,
                name: booking.sauna.saunaName,
                description: booking.sauna.saunaDescription,
                price: booking.sauna.saunaPrice,
                maxTemp: booking.sauna.saunaMaxTemp,
                numberOfPeople: booking.sauna.saunaNumberOfPeople,
                street: booking.sauna.saunaStreet,
                zip: booking.sauna.saunaZip,
                location: booking.sauna.saunaLocation,
                type: booking.sauna.saunaType,
                mobile: booking.sauna.saunaIsMobile,
            },
            price: {
                id: 1,
                transportService: booking.price.transportServicePrice,
                washService: booking.price.washServicePrice,
                saunahImp: booking.price.saunahImpPrice,
                deposit: booking.price.depositPrice,
                handTowel: booking.price.handTowelPrice,
                wood: booking.price.woodPrice,
            },
            extras: {
                washService: booking.washService,
                transportService: booking.transportServiceDistance,
                saunahImp: booking.saunahImpAmount,
                handTowel: booking.handTowelAmount,
                wood: booking.woodAmount,
                deposit: booking.deposit,
            },
        }
    }

    export function emptyRequest(saunaId: number | null): Request {
        return {
            id: null,
            saunaId: saunaId,
            startBookingDate: ModifiableDate.emptyRequest(),
            endBookingDate: ModifiableDate.emptyRequest(),
            location: '',
            discount: '',
            discountDescription: null,
            comment: null,
            transportService: CheckableNumber.emptyRequest(),
            washService: false,
            saunahImp: CheckableNumber.emptyRequest(),
            handTowel: CheckableNumber.emptyRequest(),
            wood: CheckableNumber.emptyRequest(),
            deposit: true,
        }
    }

    export function mapToRequest(booking: Response): Request {
        return {
            id: booking.id,
            saunaId: booking.sauna.id,
            startBookingDate: ModifiableDate.mapFromMoment(booking.startBookingDate),
            endBookingDate: ModifiableDate.mapFromMoment(booking.endBookingDate),
            location: booking.location,
            discount: '' + booking.discount,
            discountDescription: booking.discountDescription,
            comment: booking.comment,
            transportService: CheckableNumber.mapFromNumber(booking.extras.transportService),
            washService: booking.extras.washService,
            saunahImp: CheckableNumber.mapFromNumber(booking.extras.saunahImp),
            handTowel: CheckableNumber.mapFromNumber(booking.extras.handTowel),
            wood: CheckableNumber.mapFromNumber(booking.extras.wood),
            deposit: booking.extras.deposit,
        }
    }

    export function mapOut(booking: Request): BookingRemote.Request {
        if (booking.saunaId == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaId')

        const startBookingDate = ModifiableDate.mapOut(booking.startBookingDate)
        const endBookingDate = ModifiableDate.mapOut(booking.endBookingDate)
        if (startBookingDate == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'startBookingDate')
        if (endBookingDate == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'endBookingDate')

        return {
            saunaId: booking.saunaId,
            startBookingDate: startBookingDate,
            endBookingDate: endBookingDate,
            location: booking.location,
            transportServiceDistance: CheckableNumber.mapToNumber(booking.transportService),
            washService: booking.washService,
            saunahImpAmount: CheckableNumber.mapToNumber(booking.saunahImp),
            handTowelAmount: CheckableNumber.mapToNumber(booking.handTowel),
            woodAmount: CheckableNumber.mapToNumber(booking.wood),
            comment: booking.comment,
            discount: booking.discount ? +booking.discount : null,
            discountDescription: booking.discountDescription,
            deposit: booking.deposit,
        }
    }
}
