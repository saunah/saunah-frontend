import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { mockUserAPI } from '../../networking/api'
import AlertProvider from '../shared/AlertProvider'
import { PwResetMailRequest } from '../../entities/PwResetMailRequest'
import ResetPwMailView from './ResetPwMailView'
import { BrowserRouter } from 'react-router-dom'
import { UserMock } from '../../networking/api/user.mock'

describe('<Password Reset Mail Requeset View Test', () => {
    test('shows Form correctly', () => {
        render(<ResetPwMailView />, { wrapper: wrapper })
        expect(screen.getByTestId('pw-reset-mail-form')).toBeInTheDocument()
    })

    test('data gets send onSubmit', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        render(<ResetPwMailView />, { wrapper: wrapper })

        const button = screen.getByTestId('send-button')
        expect(button).toHaveTextContent('Reset Link Anfordern')
        fireEvent.click(button)
        expect(mock.passwordResetMail).toBeCalledTimes(1)
        expect(mock.passwordResetMail).toBeCalledWith(PwResetMailRequest.empty())

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
