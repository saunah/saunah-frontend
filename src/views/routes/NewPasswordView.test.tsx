import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { NewPassword } from '../../entities/NewPassword'
import { mockUserAPI } from '../../networking/api'
import { UserMock } from '../../networking/api/user.mock'
import AlertProvider from '../shared/AlertProvider'
import NewPasswordView from './NewPasswordView'

describe('<NewPasswordView>', () => {
    const token = '9d1eab5d-43cf-413c-9f2d-e2895d97afd5'

    test('is in the document', async () => {
        render(<NewPasswordView />, { wrapper: wrapper })
        expect(screen.getByTestId('new-password-form')).toBeInTheDocument()

        await screen.findByTestId('new-password-view')
    })

    test('data gets sent on submit', async () => {
        const mock = mockUserAPI(UserMock.simpleMock())
        render(<NewPasswordView />, { wrapper: wrapper })

        const button = screen.getByTestId('button-submit')
        fireEvent.click(button)

        expect(mock.newPassword).toBeCalledTimes(1)
        expect(mock.newPassword).toBeCalledWith(token, NewPassword.emptyRequest())

        await screen.findByTestId('home-view')
    })

    const wrapper = (props: { children?: ReactNode }) => {
        return (
            <MemoryRouter initialEntries={[`/reset-password/${token}`]}>
                <AlertProvider>
                    <Routes>
                        <Route path="/reset-password" element={<div data-testid="reset-password-view"></div>} />
                        <Route path="/reset-password/:token" element={props.children} />
                        <Route path="/" element={<div data-testid="home-view"></div>} />
                    </Routes>
                </AlertProvider>
            </MemoryRouter>
        )
    }
})
