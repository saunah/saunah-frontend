import { User } from './User'
import { UserRole } from './UserRole'

describe('User', () => {
    test('isRemoteResponse() works correctly', () => {
        expect(User.isRemoteResponse(remoteResponse)).toBe(true)

        Object.keys(remoteResponse).forEach(key => {
            expect(User.isRemoteResponse({ ...remoteResponse, [key]: undefined })).toBe(false)
        })

        expect(User.isRemoteResponse({})).toBe(false)
        expect(User.isRemoteResponse(undefined)).toBe(false)
        expect(User.isRemoteResponse('hello')).toBe(false)
    })

    test('mapIn() only works with correct input entity', () => {
        expect(User.mapIn(remoteResponse)).toEqual(localResponse)
        expect(() => User.mapIn({})).toThrow()
        expect(() => User.mapIn(undefined)).toThrow()
    })

    test('mapIn() fails if role is in wrong format', () => {
        const response = { ...remoteResponse, role: 'CUSTOM' }
        expect(() => User.mapIn(response)).toThrow()
    })

    test('mapToRequest() works correctly', () => {
        expect(User.mapToRequest(localResponse)).toEqual(localRequest)
    })

    test('mapOut() only works with correct input entity', () => {
        expect(User.mapOut(localRequest)).toEqual(remoteRequest)
    })

    test('mapping-chain works from start to end', () => {
        const mapped = User.mapOut(User.mapToRequest(User.mapIn(remoteResponse)))
        expect(mapped).toEqual(remoteRequest)
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

    // Test objects

    const remoteResponse: User.RemoteResponse = {
        id: 1,
        role: 'USER',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
    }

    const localResponse: User.Response = {
        id: 1,
        role: UserRole.Local.USER,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telephone: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
    }

    const localRequest: User.Request = {
        role: UserRole.Local.USER,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telephone: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
        password: '',
        repeatPassword: '',
    }

    const remoteRequest: User.RemoteRequest = {
        role: UserRole.Remote.USER,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
        password: '',
    }
})
