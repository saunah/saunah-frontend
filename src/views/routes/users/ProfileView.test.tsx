import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockUserAPI } from '../../../networking/api'
import { UserMock } from '../../../networking/api/user.mock'
import AlertProvider from '../../shared/AlertProvider'
import AuthProvider from '../../shared/AuthProvider'
import ProfileView from './ProfileView'

describe('<ProfileView>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
    })

    test('renders correctly', async () => {
        render(<ProfileView />, { wrapper })
        const profileView = await screen.findByTestId('profile-view')
        expect(profileView).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <AuthProvider>
            <AlertProvider>
                <MemoryRouter initialEntries={['/profile']}>
                    <Routes>
                        <Route path="/profile" element={props.children} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        </AuthProvider>
    )
}
