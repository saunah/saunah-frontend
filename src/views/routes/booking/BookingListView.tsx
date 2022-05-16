import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import Table from '../../../components/base/Table'
import BookingStateBadge from '../../../components/booking/BookingStateBadge'
import { Booking } from '../../../entities/Booking'
import api from '../../../networking/api'

const BookingListView = () => {
    const headings = ['Buchungsnr.', 'Sauna', 'Buchungsdatum', 'Preis', 'Buchungs-Status']
    const [bookings, setBooking] = useState<Booking.Response[]>([])

    useEffect(() => {
        api.booking.list().then(setBooking)
    }, [])

    function implodeNonEmpty(values: string[], separator: string = ' ') {
        return values.filter(v => v.trim().length > 0).join(separator)
    }

    return (
        <div data-testid="booking-list-view">
            <PageTitle>Buchungsverwaltung</PageTitle>
            <Table
                headings={headings}
                elements={bookings.map(booking => {
                    return [
                        <span>{implodeNonEmpty([booking.id.toString()])}</span>,
                        <span>{booking.sauna.type}</span>,
                        <span>
                            {[
                                booking.startBookingDate.format('DD.MM.YYYY'),
                                ' - ',
                                booking.endBookingDate.format('DD.MM.YYYY'),
                            ]}
                        </span>,
                        <span>{booking.endPrice}</span>,
                        <Link to={`/bookings/${booking.id}`}>
                            <BookingStateBadge state={booking.state} />
                        </Link>,
                    ]
                })}
            />
        </div>
    )
}

export default BookingListView
