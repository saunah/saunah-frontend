import { Price } from './Price'

const testRemoteResponse: Price.RemoteResponse = {
    transportService: 1,
    washService: 2,
    saunahImp: 3,
    deposit: 4,
    handTowel: 5,
    wood: 6,
}

describe('Price', () => {
    test('isRemoteResponse() works correctly', () => {
        expect(Price.isRemoteResponse(testRemoteResponse)).toBe(true)
        expect(Price.isRemoteResponse(null)).toBe(false)
        expect(Price.isRemoteResponse({})).toBe(false)
        Object.keys(testRemoteResponse).forEach(key => {
            expect(Price.isRemoteResponse({ ...testRemoteResponse, [key]: undefined })).toBe(false)
        })
    })

    test('mapIn only works with correct input entity', () => {
        expect(Price.mapIn(testRemoteResponse)).toBeTruthy()
        expect(() => Price.mapIn({})).toThrow()
    })

    test('emptyRequest() returns object with only null values', () => {
        Object.values(Price.emptyRequest()).forEach(value => expect(value).toBe(null))
    })

    test('mapping-chain works from start to end', () => {
        const mapped = Price.mapOut(Price.mapToRequest(Price.mapIn(testRemoteResponse)))
        expect(mapped).toBeTruthy()
    })
})
