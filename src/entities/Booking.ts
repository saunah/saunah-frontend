import moment, { Moment } from 'moment'
import { MissingPropertyError } from '../utils/Error'
import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { Editable } from '../utils/object'
import { Checkable, CheckableNumber } from './CheckableNumber'
import { ModifiableDate } from './ModifiableDate'

export namespace Booking {
    export type ExtrasBase = {
        washService: boolean
        transportService: number
        saunahImp: number
        handTowel: number
        wood: number
    }

    type RequestBase = {
        userId: number
        saunaId: number
        location: string
    }

    type ResponseBase = RequestBase & {
        creation: string
        state: string
        endPrice: number

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

    type RemoteDates = {
        startBookingDate: string
        endBookingDate: string
    }

    type ResponseDates = { [K in keyof RemoteDates]: Moment }
    type RequestDates = { [K in keyof RemoteDates]: ModifiableDate.Request }

    export type Response = ResponseBase & ExtrasBase & ResponseDates & Identifiable
    export type RemoteResponse = ResponseBase & ExtrasBase & RemoteDates & Identifiable

    export type Request = Editable<RequestBase> & Checkable<ExtrasBase> & RequestDates & MaybeIdentifiable
    export type RemoteRequest = RequestBase & ExtrasBase & RemoteDates & MaybeIdentifiable

    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const booking = object as RemoteResponse
        return (
            booking != null &&
            typeof booking.id === 'number' &&
            typeof booking.startBookingDate === 'string' &&
            typeof booking.endBookingDate === 'string' &&
            typeof booking.creation === 'string' &&
            typeof booking.state === 'string' &&
            typeof booking.endPrice === 'number' &&
            typeof booking.userId === 'number' &&
            typeof booking.saunaId === 'number' &&
            typeof booking.location === 'string' &&
            typeof booking.transportService === 'boolean' &&
            typeof booking.washService === 'boolean' &&
            typeof booking.saunahImp === 'number' &&
            typeof booking.handTowel === 'number' &&
            typeof booking.wood === 'number' &&
            typeof booking.saunaDescription === 'string' &&
            typeof booking.saunaIsMobile === 'boolean' &&
            typeof booking.saunaPrice === 'number' &&
            typeof booking.saunaMaxTemp === 'number' &&
            typeof booking.saunaNumberOfPeople === 'number' &&
            typeof booking.saunaLocation === 'string' &&
            typeof booking.saunaStreet === 'string' &&
            typeof booking.saunaZip === 'number' &&
            typeof booking.saunaType === 'string'
        )
    }

    export function mapIn(booking: unknown): Response {
        if (!isRemoteResponse(booking))
            throw new Error(`Object could not be mapped in. It is not of type RemoteResponse.`)

        return {
            ...booking,
            startBookingDate: moment(booking.startBookingDate),
            endBookingDate: moment(booking.endBookingDate),
        }
    }

    export function emptyRequest(userId?: number | null, saunaId?: number | null): Request {
        return {
            id: null,
            userId: userId || null,
            saunaId: saunaId || null,
            startBookingDate: ModifiableDate.emptyRequest(),
            endBookingDate: ModifiableDate.emptyRequest(),
            location: '',
            transportService: CheckableNumber.emptyRequest(),
            washService: false,
            saunahImp: CheckableNumber.emptyRequest(),
            handTowel: CheckableNumber.emptyRequest(),
            wood: CheckableNumber.emptyRequest(),
        }
    }

    export function mapToRequest(booking: Response): Request {
        return {
            id: booking.id,
            userId: booking.userId,
            saunaId: booking.saunaId,
            startBookingDate: ModifiableDate.mapFromMoment(booking.startBookingDate),
            endBookingDate: ModifiableDate.mapFromMoment(booking.endBookingDate),
            location: booking.location,
            transportService: CheckableNumber.mapFromNumber(booking.transportService),
            washService: booking.washService,
            saunahImp: CheckableNumber.mapFromNumber(booking.saunahImp),
            handTowel: CheckableNumber.mapFromNumber(booking.handTowel),
            wood: CheckableNumber.mapFromNumber(booking.wood),
        }
    }

    export function mapOut(booking: Request): RemoteRequest {
        if (booking.userId == null) throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'userId')
        if (booking.saunaId == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaId')

        return {
            ...booking,
            userId: booking.userId,
            saunaId: booking.saunaId,
            transportService: CheckableNumber.mapToNumber(booking.transportService),
            saunahImp: CheckableNumber.mapToNumber(booking.saunahImp),
            handTowel: CheckableNumber.mapToNumber(booking.handTowel),
            wood: CheckableNumber.mapToNumber(booking.wood),
            startBookingDate: ModifiableDate.mapOut(booking.startBookingDate),
            endBookingDate: ModifiableDate.mapOut(booking.endBookingDate),
        }
    }
}
