import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/base/Button'
import PageTitle from '../../../components/base/PageTitle'
import BookingEditor from '../../../components/booking/BookingEditor'
import ReceiptTable from '../../../components/booking/ReceiptTable'
import { Booking } from '../../../entities/Booking'
import { Receipt } from '../../../entities/Receipt'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'
import { useAlert } from '../../shared/AlertProvider'
import { useAuth } from '../../shared/AuthProvider'

const BookingEditorView = () => {
    const { isAdmin } = useAuth()
    const params = useParams()
    const bookingId = parseId(params['bookingId'])
    const { success } = useAlert()
    const navigate = useNavigate()

    const [booking, setBooking] = useState<Booking.Response>()
    const [editBooking, setEditBooking] = useState<Booking.Request>()
    const receipt = editBooking && booking ? Receipt.mapFromRequest(editBooking, booking.sauna, booking.price) : null

    useEffect(() => {
        if (bookingId)
            api.booking.get(bookingId).then(newBooking => {
                setBooking(newBooking)
                setEditBooking(Booking.mapToRequest(newBooking))
            })
    }, [])

    const onSubmit = async () => {
        if (bookingId && editBooking) {
            await api.booking.edit(bookingId, editBooking)
            success('Die Buchung wurde gespeichert.')
            navigate('..')
        }
    }

    return (
        <div data-testid="booking-editor-view">
            <PageTitle>Buchung bearbeiten</PageTitle>
            {editBooking && booking && (
                <BookingEditor
                    value={editBooking}
                    onChange={setEditBooking}
                    sauna={booking.sauna}
                    isEditingAsAdmin={isAdmin()}
                />
            )}
            <h2 className="text-primary-600 text-2xl font-semibold mt-6"> Berechneter Preis </h2>
            <p className="text-primary-500 mb-4">
                Der berechnete Preis setzt sich aus den aufgelisteten Kostenpunkten zusammen.
            </p>
            {receipt && <div className="mt-6">{<ReceiptTable receipt={receipt} />}</div>}
            <Button className="mt-6" data-testid="submit-button" onClick={onSubmit}>
                Speichern
            </Button>
        </div>
    )
}

export default BookingEditorView
