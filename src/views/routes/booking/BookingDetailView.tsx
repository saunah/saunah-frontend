import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../components/base/Button'
import ButtonLink from '../../../components/base/ButtonLink'
import PageTitle from '../../../components/base/PageTitle'
import Subtitle from '../../../components/base/Subtitle'
import BookingDetails from '../../../components/booking/BookingDetails'
import BookingStateBadge from '../../../components/booking/BookingStateBadge'
import ReceiptTable from '../../../components/booking/ReceiptTable'
import { Booking } from '../../../entities/Booking'
import { BookingState } from '../../../entities/BookingState'
import { Receipt } from '../../../entities/Receipt'
import { User } from '../../../entities/User'
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
    const [user, setUser] = useState<User.Response>()

    const fetch = () => {
        if (bookingId)
            api.booking.get(bookingId).then(newBooking => {
                setBooking(newBooking)
                if (isAdmin()) api.user.get(newBooking.userId).then(setUser)
            })
    }

    useEffect(() => fetch(), [])

    const approveBooking = async () => {
        if (bookingId && window.confirm('Möchten Sie die Buchung wirklich bestätigen?')) {
            await api.booking.approve(bookingId)
            success('Die Buchung wurde bestätigt.')
            fetch()
        }
    }

    const cancelBooking = async () => {
        if (bookingId && window.confirm('Möchten Sie die Buchung wirklich stornieren?')) {
            await api.booking.cancel(bookingId)
            success('Die Buchung wurde storniert.')
            fetch()
        }
    }

    return (
        <div data-testid="booking-detail-view">
            <PageTitle>
                <div className="md:flex md:justify-between md:items-center">
                    <div className="flex space-x-4 items-center">
                        <span>Buchung für {booking?.sauna.name} </span>
                        {booking && <BookingStateBadge state={booking.state} />}
                    </div>
                    {isAdmin() && booking?.state !== BookingState.CANCELED && (
                        <ButtonLink className="mt-4 md:mt-0" to="./edit">
                            Buchung bearbeiten
                        </ButtonLink>
                    )}
                </div>
            </PageTitle>

            {booking && <BookingDetails booking={booking} user={user} />}

            <Subtitle className="mt-6"> Berechneter Preis </Subtitle>
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
                    {booking?.state !== BookingState.CANCELED && (
                        <Button color="red" onClick={cancelBooking}>
                            Buchung stornieren
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default BookingDetailView
