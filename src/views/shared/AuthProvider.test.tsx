import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { mockUserAPI } from '../../networking/api'
import { UserMock } from '../../networking/api/user.mock'

import AuthProvider, { AuthProviderProps, useAuth } from './AuthProvider'

const testCredentials: LoginCredentials.Request = {
    username: 'test-user',
    password: 'test-pw',
}

describe('<AuthProvider>', () => {
    test('updates authentication status after login', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        const { result } = renderHook(useAuth, { wrapper })

        expect(result.current.isAuthenticated()).toBe(false)
        await act(() => result.current.login(testCredentials))

        expect(result.current.isAuthenticated()).toBe(true)
        expect(mock.login).toBeCalledTimes(1)
        expect(mock.login).toBeCalledWith(testCredentials)
    })

    test('update authentication status after logout', async () => {
        mockUserAPI(UserMock.simpleMock())

        const { result } = renderHook(useAuth, { wrapper })
        await act(() => result.current.login(testCredentials))
        expect(result.current.isAuthenticated()).toBe(true)
        act(() => result.current.logout())
        expect(result.current.isAuthenticated()).toBe(false)
    })
})

const wrapper = (props: AuthProviderProps) => <AuthProvider {...props} />
