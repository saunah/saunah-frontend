import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import ReceiptTable from '../../../components/booking/ReceiptTable'
import { Booking } from '../../../entities/Booking'
import { Receipt } from '../../../entities/Receipt'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'

const BookingDetailView = () => {
    const params = useParams()
    const bookingId = parseId(params['bookingId'])
    const [booking, setBooking] = useState<Booking.Response>()
    const receipt = booking ? Receipt.mapFromResponse(booking) : null

    useEffect(() => {
        if (bookingId) api.booking.get(bookingId).then(setBooking)
    }, [])

    return (
        <div>
            <PageTitle>Buchung für {booking?.sauna.name}</PageTitle>
            <h2 className="text-primary-600 text-2xl font-semibold mt-6"> Berechneter Preis </h2>
            <p className="text-primary-500 mb-4">
                Der berechnete Preis setzt sich aus den aufgelisteten Kostenpunkten zusammen.
            </p>

            {receipt && <ReceiptTable receipt={receipt} />}
        </div>
    )
}

export default BookingDetailView
