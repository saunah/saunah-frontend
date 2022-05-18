import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { SetNewPassword } from '../../entities/SetNewPassword'
import { mockUserAPI } from '../../networking/api'
import { UserMock } from '../../networking/api/user.mock'
import AlertProvider from '../shared/AlertProvider'
import ResetPasswordView from './ResetPasswordView'

describe('<ResetPasswordView tests>', () => {
    test('render correctly', () => {
        render(<ResetPasswordView />, { wrapper: wrapper })
        expect(screen.getByTestId('pw-reset-mail-form')).toBeInTheDocument()
    })

    test('data gets send onSubmit', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        render(<ResetPasswordView />, { wrapper: wrapper })

        const button = screen.getByTestId('send-button')
        expect(button).toHaveTextContent('Reset Passwort')
        fireEvent.click(button)
        expect(mock.setNewPassword).toBeCalledTimes(1)
        expect(mock.setNewPassword).toBeCalledWith(SetNewPassword.empty())

        await screen.findByTestId('pw-reset-mail-form')
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <BrowserRouter>
            <AlertProvider>{props.children}</AlertProvider>
        </BrowserRouter>
    )
}
