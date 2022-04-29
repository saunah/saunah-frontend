import { render, screen, fireEvent } from '@testing-library/react'
import RegisterView from './RegisterView'
import { User } from '../../entities/User'
import { mockUserAPI } from '../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../shared/AlertProvider'

describe('<Registervie>', () => {
    test('registerform show user correctly', () => {
        render(<RegisterView />, { wrapper: wrapper })
        expect(screen.getByTestId('registerform')).toBeInTheDocument()
    })

    test('sends data on submit', async () => {
        const mock = mockUserAPI(defaultMock())
        render(<RegisterView />, { wrapper: wrapper })

        const button = screen.getByTestId('register-button')
        expect(button).toHaveTextContent('Register')
        fireEvent.click(button)
        expect(mock.signup).toBeCalledTimes(1)
        expect(mock.signup).toBeCalledWith(User.empty())

        await screen.findByTestId('registerform')
    })
})

const defaultMock = () => {
    return {
        signup: jest.fn(() => Promise.resolve()),
    }
}

const wrapper = (props: { children?: ReactNode }) => {
    return <AlertProvider>{props.children}</AlertProvider>
}
