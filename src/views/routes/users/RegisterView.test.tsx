import { render, screen, fireEvent } from '@testing-library/react'
import RegisterView from './RegisterView'
import { User } from '../../../entities/User'
import { mockUserAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter } from 'react-router-dom'
import { UserMock } from '../../../networking/api/user.mock'

describe('<RegisterView>', () => {
    test('Form show user correctly', () => {
        render(<RegisterView />, { wrapper: wrapper })
        expect(screen.getByTestId('registerform')).toBeInTheDocument()
    })

    test('Sends data on submit', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        render(<RegisterView />, { wrapper: wrapper })

        const button = screen.getByTestId('submit-button')
        expect(button).toHaveTextContent('Benutzer registrieren')
        fireEvent.click(button)
        expect(mock.signup).toBeCalledTimes(1)
        expect(mock.signup).toBeCalledWith(User.emptyRequest())

        await screen.findByTestId('registerform')
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <MemoryRouter>
            <AlertProvider>{props.children}</AlertProvider>
        </MemoryRouter>
    )
}
