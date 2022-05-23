import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/base/Button'
import PageTitle from '../../../components/base/PageTitle'
import Subtitle from '../../../components/base/Subtitle'
import BookingEditor from '../../../components/booking/BookingEditor'
import ReceiptTable from '../../../components/booking/ReceiptTable'
import SaunaCalendar from '../../../components/saunas/SaunaCalendar'
import { Booking } from '../../../entities/Booking'
import { Price } from '../../../entities/Price'
import { Receipt } from '../../../entities/Receipt'
import { Sauna } from '../../../entities/Sauna'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'
import { useAlert } from '../../shared/AlertProvider'

const BookingView = () => {
    const params = useParams()
    const saunaId = parseId(params['saunaId'])
    const { success } = useAlert()
    const navigate = useNavigate()

    const [booking, setBooking] = useState(Booking.emptyRequest(saunaId))
    const [sauna, setSauna] = useState<Sauna.Response>()
    const [price, setPrice] = useState<Price.Response>()
    const receipt = sauna && price ? Receipt.mapFromRequest(booking, sauna, price) : null

    useEffect(() => {
        if (saunaId) api.sauna.get(saunaId).then(setSauna)
        api.price.list().then(prices => {
            if (prices.length > 0) setPrice(prices[0])
        })
    }, [])

    const onSubmit = async () => {
        const newBooking = await api.booking.add(booking)
        success('Die Buchungsanfrage wurde gesendet.')
        navigate(`/bookings/${newBooking.id}`)
    }

    return (
        <div data-testid="booking-view">
            <PageTitle>Buchung anfragen</PageTitle>
            {sauna?.googleCalendarId && <SaunaCalendar googleCalendarId={sauna.googleCalendarId} />}
            <div className="mt-4">
                <Subtitle className="mb-4"> Datum auswählen </Subtitle>
                <BookingEditor value={booking} sauna={sauna} onChange={setBooking} />
            </div>
            <Subtitle className="mt-4"> Voraussichtlicher Preis </Subtitle>
            <p className="text-primary-500 mb-4">
                Der angezeigte Preis ist eine Schätzung. Der genaue Preis wird bei der bestätigten Buchung angezeigt.{' '}
            </p>
            {receipt && <div className="mt-6">{<ReceiptTable receipt={receipt} />}</div>}
            <div className="text-primary-500 mt-6 flex space-x-4">
                <span>
                    Mit dieser Buchung akzeptieren Sie unsere <Link to="/datenschutz">Datenschutzerklärung</Link>
                </span>
            </div>
            <Button className="mt-6" data-testid="submit-button" onClick={onSubmit}>
                Buchung anfragen
            </Button>
        </div>
    )
}

export default BookingView
