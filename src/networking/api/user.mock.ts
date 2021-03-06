import { NewPassword } from '../../entities/NewPassword'
import { ResetPassword } from '../../entities/ResetPassword'
import { Token } from '../../entities/Token'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import { deferred } from '../../utils/deferred'

export namespace UserMock {
    export function simpleMock(config?: {
        list?: User.Response[]
        get?: User.Response
        edit?: User.Response
        whoami?: User.Response
    }) {
        return {
            signup: jest.fn(() => Promise.resolve()),
            login: jest.fn(() => Promise.resolve({ token: 'abc' })),
            verify: jest.fn(() => Promise.resolve()),
            list: jest.fn(() => Promise.resolve(config?.list || [sampleResponse1])),
            get: jest.fn(() => Promise.resolve(config?.get || sampleResponse1)),
            edit: jest.fn(() => Promise.resolve(config?.edit || sampleResponse1)),
            remove: jest.fn(() => Promise.resolve()),
            whoami: jest.fn(() => Promise.resolve(config?.whoami || sampleResponse1)),
            resetPassword: jest.fn(() => Promise.resolve()),
            newPassword: jest.fn(() => Promise.resolve()),
        }
    }

    export function deferredMock() {
        const signupDefer = deferred<void>()
        const loginDefer = deferred<Token.Response>()
        const verifyDefer = deferred<void>()
        const listDefer = deferred<User.Response[]>()
        const getDefer = deferred<User.Response>()
        const editDefer = deferred<User.Response>()
        const removeDefer = deferred<void>()
        const whoamiDefer = deferred<User.Response>()
        const resetPasswordDefer = deferred<void>()
        const newPasswordDefer = deferred<void>()

        const mock = {
            signup: jest.fn(() => signupDefer.promise),
            login: jest.fn(() => loginDefer.promise),
            verify: jest.fn(() => verifyDefer.promise),
            list: jest.fn(() => listDefer.promise),
            get: jest.fn(() => getDefer.promise),
            edit: jest.fn(() => editDefer.promise),
            remove: jest.fn(() => removeDefer.promise),
            whoami: jest.fn(() => whoamiDefer.promise),
            resetPassword: jest.fn(() => resetPasswordDefer.promise),
            newPassword: jest.fn(() => newPasswordDefer.promise),
        }

        return {
            mock,
            signupDefer,
            loginDefer,
            verifyDefer,
            listDefer,
            getDefer,
            editDefer,
            removeDefer,
            whoamiDefer,
            resetPasswordDefer,
            newPasswordDefer,
        }
    }

    export const sampleResponse1: User.Response = {
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

    export const sampleResponse2: User.Response = {
        id: 2,
        role: UserRole.Local.USER,
        firstName: 'Jonny',
        lastName: 'Doey',
        email: 'jonny@example.com',
        telephone: '078 987 65 43',
        street: 'Technikumstrasse 11',
        place: 'Z??rich',
        zip: '8000',
    }

    export const sampleRemoteResponse1: User.RemoteResponse = {
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

    export const sampleRequest1: User.Request = {
        role: UserRole.Local.USER,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telephone: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
        password: '',
    }

    export const sampleRemoteRequest1: User.RemoteRequest = {
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

    export const sampleResetRequest: ResetPassword.Request = {
        email: 'eins@test.com',
    }

    export const sampleNewPasswordRequest: NewPassword.Request = {
        newPassword: 'the-new-passwprd',
    }
}
