import { Price } from '../../entities/Price'

export namespace PriceMock {
    export function simpleMock(config?: {
        list?: Price.Response[]
        get?: Price.Response
        add?: Price.Response
        edit?: Price.Response
    }) {
        return {
            list: jest.fn(() => Promise.resolve(config?.list || [sampleResponse1, sampleResponse2])),
            get: jest.fn(() => Promise.resolve(config?.get || sampleResponse1)),
            add: jest.fn(() => Promise.resolve(config?.add || sampleResponse1)),
            edit: jest.fn(() => Promise.resolve(config?.edit || sampleResponse1)),
            remove: jest.fn(() => Promise.resolve()),
        }
    }

    export const sampleResponse1: Price.Response = {
        id: 1,
        transportService: 1,
        washService: 2,
        saunahImp: 3,
        deposit: 4,
        handTowel: 5,
        wood: 6,
    }

    export const sampleResponse2: Price.Response = {
        id: 2,
        transportService: 11,
        washService: 22,
        saunahImp: 33,
        deposit: 44,
        handTowel: 55,
        wood: 66,
    }

    export const sampleRequest1 = Price.mapToRequest(sampleResponse1)
}
