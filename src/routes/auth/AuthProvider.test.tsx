import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

import AuthProvider, { AuthProviderProps, useAuth } from './AuthProvider'

describe('<AuthProvider>', () => {
    test('has correct initial state', () => {
        const { result } = renderHook(useAuth, { wrapper })
        expect(result.current.isAuthenticated).toBe(false)
    })

    test('updates authentication status after login', async () => {
        const { result } = renderHook(useAuth, { wrapper })
        expect(result.current.isAuthenticated).toBe(false)
        await act(async () => await result.current.login())
        expect(result.current.isAuthenticated).toBe(true)
    })

    test('update authentication status after logout', async () => {
        const { result } = renderHook(useAuth, { wrapper })
        await act(async () => await result.current.login())
        expect(result.current.isAuthenticated).toBe(true)
        act(() => result.current.logout())
        expect(result.current.isAuthenticated).toBe(false)
    })
})

const wrapper = (props: AuthProviderProps) => <AuthProvider {...props} />
