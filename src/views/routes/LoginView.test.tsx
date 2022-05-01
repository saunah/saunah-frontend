import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { User } from '../../entities/User'
import { mockUserAPI } from '../../networking/api'
import AlertProvider from '../shared/AlertProvider'
import AuthProvider from '../shared/AuthProvider'
import LoginView from './LoginView'

const wrapper = (props: { children?: ReactNode }) => {
    return  <BrowserRouter><AuthProvider><AlertProvider>{props.children}</AlertProvider></AuthProvider></BrowserRouter>
}

const defaultMock = () => {
    return {
        signup: jest.fn(() => Promise.resolve()),
        login: jest.fn(() => Promise.resolve()),
    }
}

describe('<LoginViewTests>', () => {
    test('registerform show user correctly', () => {
        render(<LoginView />, { wrapper: wrapper })
        expect(screen.getByTestId('loginform')).toBeInTheDocument()
    })

    test('data gets send onSubmit', async () => {
        const mock = mockUserAPI(defaultMock())
        render(<LoginView />, { wrapper: wrapper })

        const button = screen.getByTestId('login-button')
        expect(button).toHaveTextContent('Login')
        fireEvent.click(button)
        expect(mock.login).toBeCalledTimes(1)
        expect(mock.login).toBeCalledWith(User.empty())

    await screen.findByTestId('loginform')
    })

})