import { MissingPropertyError } from '../utils/Error'
import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { Editable } from '../utils/object'

export namespace Sauna {
    type Base = {
        name: string
        description: string
        price: number
        maxTemp: number
        numberOfPeople: number
        street: string
        zip: number
        location: string
        type: string
        mobile: boolean
        googleCalendarId: string
    }

    type RemoteBase = {
        name: string
        description: string
        price: number
        maxTemp: number
        numberOfPeople: number
        street: string
        zip: number
        location: string
        type: string
        mobile: boolean
        googleCalendarId: string
    }

    export type Response = Base & Identifiable
    export type RemoteResponse = RemoteBase & Identifiable

    export type Request = Editable<Base> & MaybeIdentifiable
    export type RemoteRequest = RemoteBase & MaybeIdentifiable

    /**
     * Checks if a given object is of type Sauna.RemoteResponse
     * @param object The object to check
     * @returns true, if the object is of type Sauna.RemoteResponse
     */
    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const sauna = object as RemoteResponse
        return (
            sauna != null &&
            typeof sauna.id === 'number' &&
            typeof sauna.name === 'string' &&
            typeof sauna.description === 'string' &&
            typeof sauna.price === 'number' &&
            typeof sauna.maxTemp === 'number' &&
            typeof sauna.numberOfPeople === 'number' &&
            typeof sauna.street === 'string' &&
            typeof sauna.zip === 'number' &&
            typeof sauna.location === 'string' &&
            typeof sauna.type === 'string' &&
            typeof sauna.mobile === 'boolean' &&
            (typeof sauna.googleCalendarId === 'string' || typeof sauna.googleCalendarId === 'undefined')
        )
    }

    /**
     * Maps in an object of type Sauna.RemoteResponse to Sauna.Response.
     * The object to map in has to be of type Sauna.RemoteResponse otherwise the mapping will fail.
     * @param sauna the object to map in
     * @throws if the object to map in is not of type Sauna.RemoteResponse
     * @returns the mapped Sauna.Response
     */
    export function mapIn(sauna: unknown): Response {
        if (!isRemoteResponse(sauna))
            throw new Error('Object could not be mapped in. It is not of type RemoteResponse.')

        return {
            id: sauna.id,
            name: sauna.name,
            description: sauna.description,
            price: sauna.price,
            maxTemp: sauna.maxTemp,
            numberOfPeople: sauna.numberOfPeople,
            street: sauna.street,
            zip: sauna.zip,
            location: sauna.location,
            type: sauna.type,
            mobile: sauna.mobile,
            googleCalendarId: sauna.googleCalendarId,
        }
    }

    /**
     * Creates an empty object of type Sauna.Request.
     * @returns the empty object
     */
    export function emptyRequest(): Request {
        return {
            id: null,
            name: '',
            description: '',
            price: null,
            maxTemp: null,
            numberOfPeople: null,
            street: '',
            zip: null,
            location: '',
            type: '',
            mobile: false,
            googleCalendarId: '',
        }
    }

    /**
     * Maps a Sauna.Response to a Sauna.Request.
     * @param sauna the sauna of type Sauna.Response to map
     * @returns the mapped Sauna.Request
     */
    export function mapToRequest(sauna: Response): Request {
        return sauna
    }

    /**
     * Maps out an object of type Sauna.Request to Sauna.RemoteRequest
     * @param sauna the object to map out
     * @returns the mapped out Sauna.RemoteRequest
     */
    export function mapOut(sauna: Request): RemoteRequest {
        if (sauna.price == null) throw new MissingPropertyError('Sauna.Request', 'Sauna.RemoteRequest', 'price')
        if (sauna.maxTemp == null) throw new MissingPropertyError('Sauna.Request', 'Sauna.RemoteRequest', 'maxTemp')
        if (sauna.numberOfPeople == null)
            throw new MissingPropertyError('Sauna.Request', 'Sauna.RemoteRequest', 'numberOfPeople')
        if (sauna.zip == null) throw new MissingPropertyError('Sauna.Request', 'Sauna.RemoteRequest', 'zip')

        return {
            id: sauna.id,
            name: sauna.name,
            description: sauna.description,
            price: sauna.price,
            maxTemp: sauna.maxTemp,
            numberOfPeople: sauna.numberOfPeople,
            street: sauna.street,
            zip: sauna.zip,
            location: sauna.location,
            type: sauna.type,
            mobile: sauna.mobile,
            googleCalendarId: sauna.googleCalendarId,
        }
    }
}
