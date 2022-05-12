import { MissingPropertyError } from '../utils/Error'
import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { Editable } from '../utils/object'

export namespace Booking {
    type Base = {
        id: number
        startBookingDate: string
        endBookingDate: string
        creation: string
        state: string
        endPrice: number
        userId: number
        saunaId: number
        location: string
        transportService: boolean
        washService: boolean
        saunahImp: boolean
        deposit: boolean
        handTowel: boolean
        wood: boolean
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

    type RemoteBase = {
        id: number
        startBookingDate: string
        endBookingDate: string
        creation: string
        state: string
        endPrice: number
        userId: number
        saunaId: number
        location: string
        transportService: boolean
        washService: boolean
        saunahImp: boolean
        deposit: boolean
        handTowel: boolean
        wood: boolean
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

    export type Response = Base & Identifiable
    export type RemoteResponse = RemoteBase & Identifiable

    export type Request = Editable<Base> & MaybeIdentifiable
    export type RemoteRequest = RemoteBase & MaybeIdentifiable

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
            typeof booking.deposit === 'number' &&
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
        return booking
    }

    export function emptyRequest(): Request {
        return {
            id: null,
            startBookingDate: '',
            endBookingDate: '',
            creation: '',
            state: '',
            endPrice: null,
            userId: null,
            saunaId: null,
            location: '',
            transportService: false,
            washService: false,
            saunahImp: false,
            deposit: false,
            handTowel: false,
            wood: false,
            saunaDescription: '',
            saunaIsMobile: false,
            saunaPrice: null,
            saunaMaxTemp: null,
            saunaNumberOfPeople: null,
            saunaLocation: '',
            saunaStreet: '',
            saunaZip: null,
            saunaType: '',
        }
    }

    export function mapToRequest(booking: Response): Request {
        return booking
    }

    export function mapOut(booking: Request): RemoteRequest {
        if (booking.id == null) throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'id')
        if (booking.startBookingDate == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'startBookingDate')
        if (booking.endBookingDate == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'endBookingDate')
        if (booking.creation == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'creation')
        if (booking.state == null) throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'state')
        if (booking.endPrice == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'endPrice')
        if (booking.userId == null) throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'userId')
        if (booking.saunaId == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaId')
        if (booking.location == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'location')
        if (booking.transportService == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'transportService')
        if (booking.washService == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'washService')
        if (booking.saunahImp == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunahImp')
        if (booking.deposit == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'deposit')
        if (booking.handTowel == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'handTowel')
        if (booking.wood == null) throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'wood')
        if (booking.saunaDescription == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaDescription')
        if (booking.saunaIsMobile == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaIsMobile')
        if (booking.saunaPrice == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaPrice')
        if (booking.saunaMaxTemp == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaMaxTemp')
        if (booking.saunaNumberOfPeople == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaNumberOfPeople')
        if (booking.saunaLocation == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaLocation')
        if (booking.saunaStreet == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaStreet')
        if (booking.saunaZip == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaZip')
        if (booking.saunaType == null)
            throw new MissingPropertyError('Booking.Request', 'Booking.RemoteRequest', 'saunaType')

        return {
            id: booking.id,
            startBookingDate: booking.startBookingDate,
            endBookingDate: booking.endBookingDate,
            creation: booking.creation,
            state: booking.state,
            endPrice: booking.endPrice,
            userId: booking.userId,
            saunaId: booking.saunaId,
            location: booking.location,
            transportService: booking.transportService,
            washService: booking.washService,
            saunahImp: booking.saunahImp,
            deposit: booking.deposit,
            handTowel: booking.handTowel,
            wood: booking.wood,
            saunaDescription: booking.saunaDescription,
            saunaIsMobile: booking.saunaIsMobile,
            saunaPrice: booking.saunaPrice,
            saunaMaxTemp: booking.saunaMaxTemp,
            saunaNumberOfPeople: booking.saunaNumberOfPeople,
            saunaLocation: booking.saunaLocation,
            saunaStreet: booking.saunaStreet,
            saunaZip: booking.saunaZip,
            saunaType: booking.saunaType,
        }
    }
}
