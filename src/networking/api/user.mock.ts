import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'

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
}
