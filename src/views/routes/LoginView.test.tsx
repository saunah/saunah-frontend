import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AlertProvider from '../shared/AlertProvider'
import AuthProvider from '../shared/AuthProvider'
import LoginView from './LoginView'

const wrapper = (props: { children?: ReactNode }) => {
    return  <BrowserRouter><AuthProvider><AlertProvider>{props.children}</AlertProvider></AuthProvider></BrowserRouter>
}

const defaultMock = () => {
    return {
        submit: jest.fn(() => Promise.resolve()),
    }
}

describe('<LoginViewTests>', () => {
    test('registerform show user correctly', () => {
        render(<LoginView />, { wrapper: wrapper })
        expect(screen.getByTestId('loginform')).toBeInTheDocument()
    })

})