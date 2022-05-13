import { SaunaMock } from '../networking/api/sauna.mock'
import { Sauna } from './Sauna'

describe('Sauna', () => {
    const optionalKeys = ['googleCalendarId']

    test('isRemoteResponse() works correctly', () => {
        expect(Sauna.isRemoteResponse(SaunaMock.sampleRemoteResponse1)).toBe(true)
        expect(Sauna.isRemoteResponse(null)).toBe(false)
        expect(Sauna.isRemoteResponse({})).toBe(false)
        Object.keys(SaunaMock.sampleRemoteResponse1).forEach(key => {
            const expectedResult = optionalKeys.includes(key) ? true : false
            expect(Sauna.isRemoteResponse({ ...SaunaMock.sampleRemoteResponse1, [key]: undefined })).toBe(
                expectedResult
            )
        })
    })

    test('mapIn() only works with correct input entity', () => {
        expect(Sauna.mapIn(SaunaMock.sampleRemoteResponse1)).toBeTruthy()
        expect(() => Sauna.mapIn({})).toThrow()
    })

    test('emptyRequest() returns object with only falsy values', () => {
        Object.values(Sauna.emptyRequest()).forEach(value => {
            expect(value).toBeFalsy()
        })
    })

    test('mapping-chain works from start to end', () => {
        const mapped = Sauna.mapOut(Sauna.mapToRequest(Sauna.mapIn(SaunaMock.sampleRemoteResponse1)))
        expect(mapped).toBeTruthy()
    })
})
