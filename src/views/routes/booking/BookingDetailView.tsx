import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../components/base/Button'
import ButtonLink from '../../../components/base/ButtonLink'
import PageTitle from '../../../components/base/PageTitle'
import BookingDetails from '../../../components/booking/BookingDetails'
import ReceiptTable from '../../../components/booking/ReceiptTable'
import { Booking } from '../../../entities/Booking'
import { BookingState } from '../../../entities/BookingState'
import { Receipt } from '../../../entities/Receipt'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'
import { useAlert } from '../../shared/AlertProvider'
import { useAuth } from '../../shared/AuthProvider'

const BookingDetailView = () => {
    const params = useParams()
    const { isAdmin } = useAuth()
    const { success } = useAlert()
    const bookingId = parseId(params['bookingId'])
    const [booking, setBooking] = useState<Booking.Response>()
    const receipt = booking ? Receipt.mapFromResponse(booking) : null

    useEffect(() => {
        if (bookingId) api.booking.get(bookingId).then(setBooking)
    }, [])

    const approveBooking = async () => {
        if (bookingId && window.confirm('Möchten Sie die Buchung wirklich bestätigen?')) {
            api.booking.approve(bookingId)
            success('Die Buchung wurde bestätigt.')
        }
    }

    const cancelBooking = async () => {
        if (bookingId && window.confirm('Möchten Sie die Buchung wirklich stornieren?')) {
            api.booking.cancel(bookingId)
            success('Die Buchung wurde storniert.')
        }
    }

    return (
        <div>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Buchung für {booking?.sauna.name}</span>
                    {isAdmin() && <ButtonLink to="./edit">Buchung bearbeiten</ButtonLink>}
                </div>
            </PageTitle>

            {booking && <BookingDetails booking={booking} />}

            <h2 className="text-primary-600 text-2xl font-semibold mt-6"> Berechneter Preis </h2>
            <p className="text-primary-500 mb-4">
                Der berechnete Preis setzt sich aus den aufgelisteten Kostenpunkten zusammen.
            </p>

            {receipt && <ReceiptTable receipt={receipt} />}
            {isAdmin() && (
                <div className="flex mt-6 space-x-6">
                    {booking?.state === BookingState.OPENED && (
                        <Button color="green" onClick={approveBooking}>
                            Buchung bestätigen
                        </Button>
                    )}
                    <Button color="red" onClick={cancelBooking}>
                        Buchung stornieren
                    </Button>
                </div>
            )}
        </div>
    )
}

export default BookingDetailView
