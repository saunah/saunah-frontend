import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockBookingAPI, mockUserAPI } from '../../../networking/api'
import { BookingMock } from '../../../networking/api/booking.mock'
import { UserMock } from '../../../networking/api/user.mock'
import AlertProvider from '../../shared/AlertProvider'
import AuthProvider from '../../shared/AuthProvider'
import BookingListView from './BookingsListView'

describe('<BookingDetailView>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
        mockBookingAPI(BookingMock.simpleMock())
    })

    test('something', async () => {
        render(<BookingListView />, { wrapper })
        const detailView = await screen.findByTestId('booking-list-view')
        expect(detailView).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <AuthProvider>
            <AlertProvider>
                <MemoryRouter initialEntries={['/bookings']}>
                    <Routes>
                        <Route path="/bookings" element={props.children} />
                    </Routes>
                </MemoryRouter>
            </AlertProvider>
        </AuthProvider>
    )
}
