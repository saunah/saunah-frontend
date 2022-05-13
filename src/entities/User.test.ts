import { UserMock } from '../networking/api/user.mock'
import { User } from './User'
import { UserRole } from './UserRole'

describe('User', () => {
    test('isRemoteResponse() works correctly', () => {
        expect(User.isRemoteResponse(UserMock.sampleRemoteResponse1)).toBe(true)

        Object.keys(UserMock.sampleRemoteResponse1).forEach(key => {
            expect(User.isRemoteResponse({ ...UserMock.sampleRemoteResponse1, [key]: undefined })).toBe(false)
        })

        expect(User.isRemoteResponse({})).toBe(false)
        expect(User.isRemoteResponse(undefined)).toBe(false)
        expect(User.isRemoteResponse('hello')).toBe(false)
    })

    test('mapIn() only works with correct input entity', () => {
        expect(User.mapIn(UserMock.sampleRemoteResponse1)).toEqual(UserMock.sampleResponse1)
        expect(() => User.mapIn({})).toThrow()
        expect(() => User.mapIn(undefined)).toThrow()
    })

    test('mapIn() fails if role is in wrong format', () => {
        const response = { ...UserMock.sampleRemoteResponse1, role: 'CUSTOM' }
        expect(() => User.mapIn(response)).toThrow()
    })

    test('mapToRequest() works correctly', () => {
        expect(User.mapToRequest(UserMock.sampleResponse1)).toEqual(UserMock.sampleRequest1)
    })

    test('mapOut() only works with correct input entity', () => {
        expect(User.mapOut(UserMock.sampleRequest1)).toEqual(UserMock.sampleRemoteRequest1)
    })

    test('mapping-chain works from start to end', () => {
        const mapped = User.mapOut(User.mapToRequest(User.mapIn(UserMock.sampleRemoteResponse1)))
        expect(mapped).toEqual(UserMock.sampleRemoteRequest1)
    })

    test('emptyRequest() has all values set to correct defaults', () => {
        Object.entries(User.emptyRequest()).forEach(([key, value]) => {
            let expected = ''
            if (key === 'role') {
                expected = UserRole.Local.USER
            }
            expect(value).toEqual(expected)
        })
    })
})
