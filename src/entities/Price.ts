import { Identifiable, MaybeIdentifiable } from '../utils/identifiable'
import { Editable } from '../utils/object'

export namespace Price {
    type Base = {
        transportService: number
        washService: number
        saunahImp: number
        deposit: number
        handTowel: number
        wood: number
    }

    export type Response = Base & Identifiable
    export type RemoteResponse = Base & Identifiable

    export type Request = Editable<Base> & MaybeIdentifiable
    export type RemoteRequest = Base & MaybeIdentifiable

    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const price = object as RemoteResponse
        return (
            price != null &&
            typeof price.id === 'number' &&
            typeof price.transportService === 'number' &&
            typeof price.washService === 'number' &&
            typeof price.saunahImp === 'number' &&
            typeof price.deposit === 'number' &&
            typeof price.handTowel === 'number' &&
            typeof price.wood === 'number'
        )
    }

    export function mapIn(price: unknown): Response {
        if (!isRemoteResponse(price))
            throw new Error(`Object could not be mapped in. It is not of type RemoteResponse.`)
        return price
    }

    export function emptyRequest(): Request {
        return {
            id: null,
            transportService: '',
            washService: '',
            saunahImp: '',
            deposit: '',
            handTowel: '',
            wood: '',
        }
    }

    export function mapToRequest(price: Response): Request {
        return {
            id: price.id,
            transportService: '' + price.transportService,
            washService: '' + price.washService,
            saunahImp: '' + price.saunahImp,
            deposit: '' + price.deposit,
            handTowel: '' + price.handTowel,
            wood: '' + price.wood,
        }
    }

    export function mapOut(price: Request): RemoteRequest {
        return {
            id: price.id,
            transportService: +price.transportService,
            washService: +price.washService,
            saunahImp: +price.saunahImp,
            deposit: +price.deposit,
            handTowel: +price.handTowel,
            wood: +price.wood,
        }
    }
}
