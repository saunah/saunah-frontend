import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { emptyBoolean, emptyNumber, emptyString } from '../utils/mapping'

export namespace Sauna {
    type Base = {
        name: string
        description: string
        price: number
        maxTemp: number
        numberOfPeople: number
        street: string
        zip: string
        location: string
        type: boolean
    }

    export type Response = Base & Identifiable

    export type RemoteResponse = {
        name: string
        description: string
        prize: number
        maxTemp: number
        numberOfPeople: number
        street: string
        plz: string
        location: string
        type: boolean
    }

    export type Request = Base & MaybeIdentifiable
    export type RemoteRequest = RemoteResponse

    /**
     * Checks if a given object is of type Sauna.RemoteResponse
     * @param object The object to check
     * @returns true, if the object is of type Sauna.RemoteResponse
     */
    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const sauna = object as RemoteResponse
        return (
            sauna != null &&
            typeof sauna.name === 'string' &&
            typeof sauna.description === 'string' &&
            typeof sauna.prize === 'number' &&
            typeof sauna.maxTemp === 'number' &&
            typeof sauna.numberOfPeople === 'number' &&
            typeof sauna.street === 'string' &&
            typeof sauna.plz === 'string' &&
            typeof sauna.location === 'string' &&
            typeof sauna.type === 'boolean'
        )
    }

    /**
     * Maps in an object of type Sauna.RemoteResponse to Sauna.Response.
     * The object to map in has to be of type Sauna.RemoteResponse otherwise the mapping will fail.
     * @param sauna The object to map in
     * @throws An error if the object to map in is not of type Sauna.RemoteResponse
     * @returns The mapped Sauna.Response
     */
    export function mapIn(sauna: unknown): Response {
        if (!isRemoteResponse(sauna))
            throw Error(`Object ${sauna} could not be mapped in. It is not of type RemoteResponse.`)

        // TODO: change to correct id
        return {
            id: 12,
            name: sauna.name,
            description: sauna.description,
            price: sauna.prize,
            maxTemp: sauna.maxTemp,
            numberOfPeople: sauna.numberOfPeople,
            street: sauna.street,
            zip: sauna.plz,
            location: sauna.location,
            type: sauna.type,
        }
    }

    /**
     * Creates an empty object of type Sauna.Request.
     * @returns the empty object
     */
    export function emptyRequest(): Request {
        return {
            id: null,
            name: emptyString(),
            description: emptyString(),
            price: emptyNumber(),
            maxTemp: emptyNumber(),
            numberOfPeople: emptyNumber(),
            street: emptyString(),
            zip: emptyString(),
            location: emptyString(),
            type: emptyBoolean(),
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
        return {
            name: sauna.name,
            description: sauna.description,
            prize: sauna.price,
            maxTemp: sauna.maxTemp,
            numberOfPeople: sauna.numberOfPeople,
            street: sauna.street,
            plz: sauna.zip,
            location: sauna.location,
            type: sauna.type,
        }
    }
}
