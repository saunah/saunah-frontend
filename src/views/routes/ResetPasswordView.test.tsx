import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { mockUserAPI } from '../../networking/api'
import AlertProvider from '../shared/AlertProvider'
import { BrowserRouter } from 'react-router-dom'
import { UserMock } from '../../networking/api/user.mock'
import { ResetPassword } from '../../entities/ResetPassword'
import ResetPasswordView from './ResetPasswordView'

describe('<ResetPasswordView>', () => {
    test('shows form correctly', () => {
        render(<ResetPasswordView />, { wrapper: wrapper })
        expect(screen.getByTestId('reset-password-form')).toBeInTheDocument()
    })

    test('data gets sent on submit', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        render(<ResetPasswordView />, { wrapper: wrapper })

        const button = screen.getByTestId('button-submit')
        fireEvent.click(button)

        expect(mock.resetPassword).toBeCalledTimes(1)
        expect(mock.resetPassword).toBeCalledWith(ResetPassword.emptyRequest())

        await screen.findByTestId('reset-password-view')
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <BrowserRouter>
            <AlertProvider>{props.children}</AlertProvider>
        </BrowserRouter>
    )
}
