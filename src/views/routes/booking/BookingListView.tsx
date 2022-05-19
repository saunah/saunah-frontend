import { InformationCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import Table from '../../../components/base/Table'
import BookingStateBadge from '../../../components/booking/BookingStateBadge'
import { Booking } from '../../../entities/Booking'
import api from '../../../networking/api'
import { formatPrice } from '../../../utils/format'
import { useAuth } from '../../shared/AuthProvider'

const BookingListView = () => {
    const headings = ['ID', 'Sauna', 'Buchungsdatum', 'Preis', 'Buchungs-Status', '']
    const [bookings, setBookings] = useState<Booking.Response[]>([])
    const { isAdmin, isInitialized } = useAuth()

    useEffect(() => {
        if (isInitialized) {
            if (isAdmin()) api.booking.listAll().then(setBookings)
            else api.booking.list().then(setBookings)
        }
    }, [isInitialized])

    return (
        <div data-testid="booking-list-view">
            <PageTitle>Buchungsverwaltung</PageTitle>
            <Table
                headings={headings}
                elements={bookings.map(booking => {
                    return [
                        <Link to={`/bookings/${booking.id}`}>{booking.id}</Link>,
                        <Link to={`/saunas/${booking.sauna.id}`}>{booking.sauna.name}</Link>,

                        <span>
                            {[
                                booking.startBookingDate.format('DD.MM.YYYY'),
                                ' - ',
                                booking.endBookingDate.format('DD.MM.YYYY'),
                            ]}
                        </span>,
                        <span>{formatPrice(booking.endPrice)}</span>,
                        <div className="flex text-sm">
                            <BookingStateBadge state={booking.state} small={true} />
                        </div>,
                        <Link to={`/bookings/${booking.id}`} className="text-right">
                            <InformationCircleIcon className="w-6 h-6 float-right" />
                        </Link>,
                    ]
                })}
            />
        </div>
    )
}

export default BookingListView
