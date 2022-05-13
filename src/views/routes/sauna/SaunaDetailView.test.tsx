import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockSaunaAPI, mockUserAPI } from '../../../networking/api'
import { SaunaMock } from '../../../networking/api/sauna.mock'
import { UserMock } from '../../../networking/api/user.mock'
import AuthProvider from '../../shared/AuthProvider'
import SaunaDetailView from './SaunaDetailView'

jest.mock('../../../components/saunas/SaunaCalendar')

describe('<SaunaDetailView>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
    })

    test('shows SaunaDetail correctly', async () => {
        mockSaunaAPI(SaunaMock.simpleMock())
        render(<SaunaDetailView />, { wrapper: wrapper })
        expect(await screen.findByTestId('sauna-detail-view')).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <AuthProvider>
            <MemoryRouter initialEntries={['/saunas/1']}>
                <Routes>
                    <Route path="/saunas/:saunaId" element={props.children} />
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    )
}
