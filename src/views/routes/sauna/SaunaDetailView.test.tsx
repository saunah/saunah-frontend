import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockSaunaAPI, mockSaunaImageAPI, mockUserAPI } from '../../../networking/api'
import { SaunaMock } from '../../../networking/api/sauna.mock'
import { SaunaImagesMock } from '../../../networking/api/saunaImages.mock'
import { UserMock } from '../../../networking/api/user.mock'
import AuthProvider from '../../shared/AuthProvider'
import SaunaDetailView from './SaunaDetailView'

jest.mock('../../../components/saunas/SaunaCalendar')

describe('<SaunaDetailView>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
        mockSaunaAPI(SaunaMock.simpleMock())
        mockSaunaImageAPI(SaunaImagesMock.simpleMock())
    })

    test('shows SaunaDetail correctly', async () => {
        render(<SaunaDetailView />, { wrapper: wrapper })
        expect(await screen.findByTestId('sauna-detail-view')).toBeInTheDocument()
    })

    test('does not show calendar if calendar ID is not set', async () => {
        const noCalendarSauna = { ...SaunaMock.sampleResponse1, googleCalendarId: undefined }
        mockSaunaAPI(SaunaMock.simpleMock({ get: noCalendarSauna }))
        render(<SaunaDetailView />, { wrapper: wrapper })
        expect(await screen.findByTestId('sauna-detail-view')).toBeInTheDocument()
        expect(screen.queryByTestId('sauna-calendar')).toBeNull()
    })

    test('shows calendar if calendar ID is set', async () => {
        const withCalendarSauna = { ...SaunaMock.sampleResponse1, googleCalendarId: 'test-calendar-id' }
        mockSaunaAPI(SaunaMock.simpleMock({ get: withCalendarSauna }))
        render(<SaunaDetailView />, { wrapper: wrapper })
        expect(await screen.findByTestId('sauna-detail-view')).toBeInTheDocument()
        expect(screen.getByTestId('sauna-calendar')).toBeInTheDocument()
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
