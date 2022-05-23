import { SaunahError } from './SaunahError'

const testRemoteResponse: SaunahError.RemoteResponse = {
    timestamp: '2022-05-18T10:20:00.000+00:00',
    status: 'oops',
    code: 401,
    message: 'Völlig falsch',
}

describe('SaunahError', () => {
    test('isRemoteResponse() works as expected', () => {
        expect(SaunahError.isRemoteResponse(null)).toBe(false)
        expect(SaunahError.isRemoteResponse({})).toBe(false)
        expect(SaunahError.isRemoteResponse(testRemoteResponse)).toBe(true)
    })

    test('mapIn() only works with correct input entity', () => {
        expect(SaunahError.mapIn(testRemoteResponse)).toBeTruthy()
        expect(() => SaunahError.mapIn({})).toThrow()
    })
})
