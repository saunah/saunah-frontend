import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockUserAPI } from '../../../networking/api'
import { UserMock } from '../../../networking/api/user.mock'
import AlertProvider from '../../shared/AlertProvider'
import ActivationView from './ActivationView'

describe('<ActivationView>', () => {
    test('behaves correctly on success', async () => {
        const { mock, verifyDefer } = UserMock.deferredMock()
        mockUserAPI(mock)
        render(<ActivationView />, { wrapper: wrapper('abc') })

        expect(mock.verify).toBeCalledTimes(1)
        expect(mock.verify).toBeCalledWith('abc')
        expect(screen.getByTestId('activation-view')).toBeInTheDocument()

        verifyDefer.resolve()
        expect(await screen.findByText('Login')).toBeInTheDocument()
        expect(screen.getByText('Der Account wurde erfolgreich aktiviert.')).toBeInTheDocument()
    })
    test('behaves correctly on failure', async () => {
        const { mock, verifyDefer } = UserMock.deferredMock()
        mockUserAPI(mock)
        render(<ActivationView />, { wrapper: wrapper('abc') })

        verifyDefer.reject()
        expect(await screen.findByText('Login')).toBeInTheDocument()
        expect(screen.getByText('Der Account konnte nicht aktiviert werden.')).toBeInTheDocument()
    })
})

const wrapper = (token: string) => (props: { children?: ReactNode }) => {
    return (
        <AlertProvider>
            <MemoryRouter initialEntries={['/verify/' + token]}>
                <Routes>
                    <Route path="/verify/:token" element={props.children} />
                    <Route path="/login" element={<div>Login</div>} />
                </Routes>
            </MemoryRouter>
        </AlertProvider>
    )
}
