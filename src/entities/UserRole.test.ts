import { UserRole } from './UserRole'

describe('UserRole', () => {
    const remoteKeyUser = 'USER'
    const remoteKeyAdmin = 'ADMIN'

    const localUser = UserRole.Local.USER
    const localAdmin = UserRole.Local.ADMIN
    const remoteUser = UserRole.Remote.USER
    const remoteAdmin = UserRole.Remote.ADMIN

    test('isRemote() works correctly', () => {
        expect(UserRole.isRemote(remoteKeyUser)).toBe(true)
        expect(UserRole.isRemote(remoteKeyAdmin)).toBe(true)

        expect(UserRole.isRemote(undefined)).toBe(false)
        expect(UserRole.isRemote('')).toBe(false)
    })

    test('mapIn() only works with correct input entity', () => {
        expect(UserRole.mapIn(remoteUser)).toEqual(localUser)
        expect(UserRole.mapIn(remoteAdmin)).toEqual(localAdmin)

        expect(UserRole.mapIn(remoteUser)).not.toEqual(localAdmin)
        expect(UserRole.mapIn(remoteAdmin)).not.toEqual(localUser)
    })

    test('mapOut() only works with correct input entity', () => {
        expect(UserRole.mapOut(localUser)).toEqual(remoteUser)
        expect(UserRole.mapOut(localAdmin)).toEqual(remoteAdmin)

        expect(UserRole.mapOut(localUser)).not.toEqual(remoteAdmin)
        expect(UserRole.mapOut(localAdmin)).not.toEqual(remoteUser)
    })
})
