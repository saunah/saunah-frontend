import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/base/Button'
import PageTitle from '../../../components/base/PageTitle'
import BookingEditor from '../../../components/booking/BookingEditor'
import PricePrediction from '../../../components/booking/PricePrediction'
import { Booking } from '../../../entities/Booking'
import { Price } from '../../../entities/Price'
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

    const [booking, setBooking] = useState(Booking.emptyRequest(me?.id, saunaId))
    const [sauna, setSauna] = useState<Sauna.Response>()
    const [price, setPrice] = useState<Price.Response>()

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
            {sauna && price && (
                <div className="mt-6">
                    <PricePrediction sauna={sauna} prices={price} booking={booking} />
                </div>
            )}
            <Button className="mt-6" data-testid="submit-button" onClick={onSubmit}>
                Buchung anfragen
            </Button>
        </div>
    )
}

export default BookingView
