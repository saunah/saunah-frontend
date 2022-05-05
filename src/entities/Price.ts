import { MissingPropertyError } from '../utils/Error'
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

    export type Response = Base
    export type RemoteResponse = Base

    export type Request = Editable<Base>
    export type RemoteRequest = Base

    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const price = object as RemoteResponse
        return (
            price != null &&
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
            transportService: null,
            washService: null,
            saunahImp: null,
            deposit: null,
            handTowel: null,
            wood: null,
        }
    }

    export function mapToRequest(price: Response): Request {
        return price
    }

    export function mapOut(price: Request): RemoteRequest {
        if (price.transportService == null)
            throw new MissingPropertyError('Price.Request', 'Price.RemoteRequest', 'transportService')
        if (price.washService == null)
            throw new MissingPropertyError('Price.Request', 'Price.RemoteRequest', 'washService')
        if (price.saunahImp == null) throw new MissingPropertyError('Price.Request', 'Price.RemoteRequest', 'saunahImp')
        if (price.deposit == null) throw new MissingPropertyError('Price.Request', 'Price.RemoteRequest', 'deposit')
        if (price.handTowel == null) throw new MissingPropertyError('Price.Request', 'Price.RemoteRequest', 'handTowel')
        if (price.wood == null) throw new MissingPropertyError('Price.Request', 'Price.RemoteRequest', 'wood')

        return {
            transportService: price.transportService,
            washService: price.washService,
            saunahImp: price.saunahImp,
            deposit: price.deposit,
            handTowel: price.handTowel,
            wood: price.wood,
        }
    }
}
