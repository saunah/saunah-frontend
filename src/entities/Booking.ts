import { Moment } from 'moment'
import { MissingPropertyError } from '../utils/Error'
import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { Editable } from '../utils/object'
import { BookingRemote } from './BookingRemote'
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
        // TODO: Change to enum
        state: string
        endPrice: number
        sauna: Sauna.Response
        price: Price.Response
        extras: Extras
    } & Base &
        Identifiable

    export type Request = Editable<{
        saunaId: number
    }> &
        ModifiableDate.Object<Base> &
        CheckableNumber.Object<Extras> &
        MaybeIdentifiable

    export function isRemoteResponse(object: unknown): object is BookingRemote.Response {
        return (object as BookingRemote.Response).michi === true
    }

    export function mapIn(booking: unknown): Response {
        if (!isRemoteResponse(booking))
            throw new Error(`Object could not be mapped in. It is not of type RemoteResponse.`)
        return {} as any as Booking.Response
    }

    export function emptyRequest(saunaId: number | null): Request {
        return {
            id: null,
            saunaId: saunaId,
            startBookingDate: ModifiableDate.emptyRequest(),
            endBookingDate: ModifiableDate.emptyRequest(),
            location: '',
            discount: null,
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
            discount: booking.discount,
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

        return { michi: true }
    }
}
