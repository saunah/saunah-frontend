import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import BookingRequest from '../../../components/saunas/BookingRequest'
import { Booking } from '../../../entities/Booking'
import api from '../../../networking/api'
import { useAlert } from '../../shared/AlertProvider'

const BookingView = () => {
    const [booking, setBooking] = useState(Booking.emptyRequest())
    const { success } = useAlert()
    const navigate = useNavigate()

    const fetch = () => {
        api.booking.list().then(bookings => {
            if (bookings.length > 0) setBooking(Booking.mapToRequest(bookings[0]))
        })
    }

    useEffect(() => fetch(), [])

    const onSubmit = async () => {
        if (booking.id != null) await api.booking.edit(booking.id, booking)
        else await api.booking.add(booking)
        success('Die Buchung war erfolgreich.')
        navigate('/saunas')
    }

    return (
        <div data-testid="booking-view">
            <PageTitle>Buchung</PageTitle>
            <BookingRequest value={booking} onChange={setBooking} onSubmit={onSubmit} />
        </div>
    )
}

export default BookingView
