import { Token } from './Token'

const testRemoteResponse: Token.RemoteResponse = {
    token: 'abcde',
}

describe('Token', () => {
    test('isRemoteResponse() works correctly', () => {
        expect(Token.isRemoteResponse(testRemoteResponse)).toBe(true)
        expect(Token.isRemoteResponse(null)).toBe(false)
        expect(Token.isRemoteResponse({})).toBe(false)
    })

    test('mapIn() only works with correct input entity', () => {
        expect(Token.mapIn(testRemoteResponse)).toBeTruthy()
        expect(() => Token.mapIn({})).toThrow()
    })
})
