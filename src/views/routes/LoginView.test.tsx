import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import { mockUserAPI } from '../../networking/api'
import AlertProvider from '../shared/AlertProvider'
import AuthProvider from '../shared/AuthProvider'
import LoginView from './LoginView'

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AlertProvider>{props.children}</AlertProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

const defaultMock = () => {
    return {
        signup: jest.fn(() => Promise.resolve()),
        login: jest.fn(() => Promise.resolve({ token: 'abc' })),
        verify: jest.fn(() => Promise.resolve()),
        list: jest.fn(() => Promise.resolve([])),
        get: jest.fn(() => Promise.resolve(testUser)),
        edit: jest.fn(() => Promise.resolve(testUser)),
        remove: jest.fn(() => Promise.resolve()),
        whoami: jest.fn(() => Promise.resolve(testUser)),
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

describe('<LoginView>', () => {
    test('shows LoginForm correctly', async () => {
        mockUserAPI(defaultMock())
        render(<LoginView />, { wrapper: wrapper })
        expect(screen.getByTestId('loginform')).toBeInTheDocument()

        await screen.findByTestId('loginform')
    })

    test('data gets send onSubmit', async () => {
        const mock = mockUserAPI(defaultMock())
        render(<LoginView />, { wrapper: wrapper })

        const button = screen.getByTestId('login-button')
        expect(button).toHaveTextContent('Login')
        fireEvent.click(button)
        expect(mock.login).toBeCalledTimes(1)
        expect(mock.login).toBeCalledWith(LoginCredentials.empty())

        await screen.findByTestId('loginform')
    })
})
