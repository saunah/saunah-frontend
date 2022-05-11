import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import { mockUserAPI } from '../../networking/api'
import { deferred } from '../../utils/deferred'
import AlertProvider from '../shared/AlertProvider'
import ActivationView from './ActivationView'

describe('<ActivationView>', () => {
    test('behaves correctly on success', async () => {
        const { mock, verifyPromise } = defaultMock()
        mockUserAPI(mock)
        render(<ActivationView />, { wrapper: wrapper('abc') })

        expect(mock.verify).toBeCalledTimes(1)
        expect(mock.verify).toBeCalledWith('abc')
        expect(screen.getByTestId('activation-view')).toBeInTheDocument()

        verifyPromise.resolve()
        expect(await screen.findByText('Login')).toBeInTheDocument()
        expect(screen.getByText('Der Account wurde erfolgreich aktiviert.')).toBeInTheDocument()
    })
    test('behaves correctly on failure', async () => {
        const { mock, verifyPromise } = defaultMock()
        mockUserAPI(mock)
        render(<ActivationView />, { wrapper: wrapper('abc') })

        verifyPromise.reject()
        expect(await screen.findByText('Login')).toBeInTheDocument()
        expect(screen.getByText('Der Account konnte nicht aktiviert werden.')).toBeInTheDocument()
    })
})

const wrapper = (token: string) => (props: { children?: ReactNode }) => {
    return (
        <AlertProvider>
            <MemoryRouter initialEntries={['/verify/' + token]}>
                <Routes>
                    <Route path="/verify/:token" element={props.children} />
                    <Route path="/login" element={<div>Login</div>} />
                </Routes>
            </MemoryRouter>
        </AlertProvider>
    )
}

const defaultMock = () => {
    const verifyPromise = deferred<void>()

    const mock = {
        signup: jest.fn(() => Promise.resolve()),
        login: jest.fn(() => Promise.resolve({ token: 'abc' })),
        verify: jest.fn(() => verifyPromise.promise),
        list: jest.fn(() => Promise.resolve([])),
        get: jest.fn(() => Promise.resolve(testUser)),
        edit: jest.fn(() => Promise.resolve(testUser)),
        remove: jest.fn(() => Promise.resolve()),
        whoami: jest.fn(() => Promise.resolve(testUser)),
    }

    return {
        mock,
        verifyPromise,
    }
}

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
