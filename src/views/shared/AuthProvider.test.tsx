import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { Token } from '../../entities/Token'
import { mockUserAPI } from '../../networking/api'

import AuthProvider, { AuthProviderProps, useAuth } from './AuthProvider'

const defaultMock = () => ({
    signup: jest.fn(() => Promise.resolve()),
    login: jest.fn(() => Promise.resolve(testToken)),
    passwordResetMail: jest.fn(()=> Promise.resolve()),
    setNewPassword: jest.fn(()=> Promise.resolve()),
})

const testCredentials: LoginCredentials.Request = {
    username: 'test-user',
    password: 'test-pw',
}

const testToken: Token.Response = { token: 'abc' }

describe('<AuthProvider>', () => {
    test('has correct initial state', () => {
        const { result } = renderHook(useAuth, { wrapper })
        expect(result.current.isAuthenticated).toBe(false)
    })

    test('updates authentication status after login', async () => {
        const mock = mockUserAPI(defaultMock())
        const { result } = renderHook(useAuth, { wrapper })

        expect(result.current.isAuthenticated).toBe(false)
        await act(() => result.current.login(testCredentials))

        expect(result.current.isAuthenticated).toBe(true)
        expect(mock.login).toBeCalledTimes(1)
        expect(mock.login).toBeCalledWith(testCredentials)
    })

    test('update authentication status after logout', async () => {
        mockUserAPI(defaultMock())

        const { result } = renderHook(useAuth, { wrapper })
        await act(() => result.current.login(testCredentials))
        expect(result.current.isAuthenticated).toBe(true)
        act(() => result.current.logout())
        expect(result.current.isAuthenticated).toBe(false)
    })
})

const wrapper = (props: AuthProviderProps) => <AuthProvider {...props} />
