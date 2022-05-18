import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockBookingAPI, mockPriceAPI, mockSaunaAPI, mockUserAPI } from '../../../networking/api'
import { BookingMock } from '../../../networking/api/booking.mock'
import { PriceMock } from '../../../networking/api/price.mock'
import { SaunaMock } from '../../../networking/api/sauna.mock'
import { UserMock } from '../../../networking/api/user.mock'
import AlertProvider from '../../shared/AlertProvider'
import AuthProvider from '../../shared/AuthProvider'
import BookingView from './BookingView'

describe('<BookingView>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
        mockBookingAPI(BookingMock.simpleMock())
        mockSaunaAPI(SaunaMock.simpleMock())
        mockPriceAPI(PriceMock.simpleMock())
    })

    test('renders correctly', async () => {
        render(<BookingView />, { wrapper })
        const detailView = await screen.findByTestId('booking-view')
        expect(detailView).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <AuthProvider>
            <AlertProvider>
                <MemoryRouter initialEntries={['/saunas/1/book']}>
                    <Routes>
                        <Route path="/saunas/:saunaId/book" element={props.children} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        </AuthProvider>
    )
}
