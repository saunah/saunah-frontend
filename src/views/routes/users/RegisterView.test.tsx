import { render, screen, fireEvent } from '@testing-library/react'
import RegisterView from './RegisterView'
import { User } from '../../../entities/User'
import { mockUserAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter } from 'react-router-dom'
import { UserRole } from '../../../entities/UserRole'

describe('<RegisterView>', () => {
    test('Form show user correctly', () => {
        render(<RegisterView />, { wrapper: wrapper })
        expect(screen.getByTestId('registerform')).toBeInTheDocument()
    })

    test('Sends data on submit', async () => {
        const mock = mockUserAPI(defaultMock())
        render(<RegisterView />, { wrapper: wrapper })

        const button = screen.getByTestId('submit-button')
        expect(button).toHaveTextContent('Benutzer registrieren')
        fireEvent.click(button)
        expect(mock.signup).toBeCalledTimes(1)
        expect(mock.signup).toBeCalledWith(User.emptyRequest())

        await screen.findByTestId('registerform')
    })
})

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

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <MemoryRouter>
            <AlertProvider>{props.children}</AlertProvider>
        </MemoryRouter>
    )
}
