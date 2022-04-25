import { Sauna } from './Sauna'

const testRemoteResponse: Sauna.RemoteResponse = {
    id: 12,
    name: 'Karhu',
    description: 'Nice sauna',
    price: 10,
    maxTemp: 12,
    numberOfPeople: 100,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: true,
}

describe('Sauna', () => {
    test('isRemoteResponse() works correctly', () => {
        expect(Sauna.isRemoteResponse(testRemoteResponse)).toBe(true)
        expect(Sauna.isRemoteResponse(null)).toBe(false)
        expect(Sauna.isRemoteResponse({})).toBe(false)
        Object.keys(testRemoteResponse).forEach(key => {
            expect(Sauna.isRemoteResponse({ ...testRemoteResponse, [key]: undefined })).toBe(false)
        })
    })

    test('mapIn() only works with correct input entity', () => {
        expect(Sauna.mapIn(testRemoteResponse)).toBeTruthy()
        expect(() => Sauna.mapIn({})).toThrow()
    })

    test('emptyRequest() returns object with only null values', () => {
        Object.values(Sauna.emptyRequest()).forEach(value => expect(value).toBeNull())
    })

    test('mapping-chain works from start to end', () => {
        const mapped = Sauna.mapOut(Sauna.mapToRequest(Sauna.mapIn(testRemoteResponse)))
        expect(mapped).toBeTruthy()
    })
})
