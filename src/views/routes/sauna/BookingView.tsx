import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/base/Button'
import PageTitle from '../../../components/base/PageTitle'
import BookingEditor from '../../../components/booking/BookingEditor'
import ReceiptTable from '../../../components/booking/ReceiptTable'
import { Booking } from '../../../entities/Booking'
import { Price } from '../../../entities/Price'
import { Receipt } from '../../../entities/Receipt'
import { Sauna } from '../../../entities/Sauna'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'
import { useAlert } from '../../shared/AlertProvider'
import { useAuth } from '../../shared/AuthProvider'

const BookingView = () => {
    const { me } = useAuth()
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
        await api.booking.add(booking)
        success('Die Buchung war erfolgreich.')
        navigate('..')
    }

    return (
        <div data-testid="booking-view">
            <PageTitle>Buchung anfragen</PageTitle>
            <BookingEditor value={booking} sauna={sauna} onChange={setBooking} />
            <h2 className="text-primary-600 text-2xl font-semibold mt-6"> Voraussichtlicher Preis </h2>
            <p className="text-primary-500 mb-4">
                Der angezeigte Preis ist eine Schätzung. Der genaue Preis wird bei der bestätigten Buchung angezeigt.{' '}
            </p>
            {receipt && <div className="mt-6">{<ReceiptTable receipt={receipt} />}</div>}
            <Button className="mt-6" data-testid="submit-button" onClick={onSubmit}>
                Buchung anfragen
            </Button>
        </div>
    )
}

export default BookingView
