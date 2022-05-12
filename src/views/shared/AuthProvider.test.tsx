import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { Token } from '../../entities/Token'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import { mockUserAPI } from '../../networking/api'

import AuthProvider, { AuthProviderProps, useAuth } from './AuthProvider'

const defaultMock = () => ({
    signup: jest.fn(() => Promise.resolve()),
    login: jest.fn(() => Promise.resolve(testToken)),
    verify: jest.fn(() => Promise.resolve()),
    list: jest.fn(() => Promise.resolve([])),
    get: jest.fn(() => Promise.resolve(testUser)),
    edit: jest.fn(() => Promise.resolve(testUser)),
    remove: jest.fn(() => Promise.resolve()),
    whoami: jest.fn(() => Promise.resolve(testUser)),
})

const testUser: User.Response = {
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

const testCredentials: LoginCredentials.Request = {
    username: 'test-user',
    password: 'test-pw',
}

const testToken: Token.Response = { token: 'abc' }

describe('<AuthProvider>', () => {
    test('updates authentication status after login', async () => {
        const mock = mockUserAPI(defaultMock())
        const { result } = renderHook(useAuth, { wrapper })

        expect(result.current.isAuthenticated()).toBe(false)
        await act(() => result.current.login(testCredentials))

        expect(result.current.isAuthenticated()).toBe(true)
        expect(mock.login).toBeCalledTimes(1)
        expect(mock.login).toBeCalledWith(testCredentials)
    })

    test('update authentication status after logout', async () => {
        mockUserAPI(defaultMock())

        const { result } = renderHook(useAuth, { wrapper })
        await act(() => result.current.login(testCredentials))
        expect(result.current.isAuthenticated()).toBe(true)
        act(() => result.current.logout())
        expect(result.current.isAuthenticated()).toBe(false)
    })
})

const wrapper = (props: AuthProviderProps) => <AuthProvider {...props} />
