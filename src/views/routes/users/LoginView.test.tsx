import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoginCredentials } from '../../../entities/LoginCredentials'
import { mockUserAPI } from '../../../networking/api'
import { UserMock } from '../../../networking/api/user.mock'
import AlertProvider from '../../shared/AlertProvider'
import AuthProvider from '../../shared/AuthProvider'
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

describe('<LoginView>', () => {
    test('shows LoginForm correctly', async () => {
        mockUserAPI(UserMock.simpleMock())
        render(<LoginView />, { wrapper: wrapper })
        expect(screen.getByTestId('loginform')).toBeInTheDocument()

        await screen.findByTestId('loginform')
    })

    test('data gets send onSubmit', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        render(<LoginView />, { wrapper: wrapper })

        const button = screen.getByTestId('login-button')
        expect(button).toHaveTextContent('Login')
        fireEvent.click(button)
        expect(mock.login).toBeCalledTimes(1)
        expect(mock.login).toBeCalledWith(LoginCredentials.empty())

        await screen.findByTestId('loginform')
    })
})
