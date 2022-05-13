import { Booking } from '../../entities/Booking'
import { Price } from '../../entities/Price'
import { Sauna } from '../../entities/Sauna'

export type ReceiptProps = {
    sauna: Sauna.Response
    prices: Price.Response
    booking: Booking.Request
}

const PricePrediction = (props: ReceiptProps) => {
    return (
        <div>
            <h2 className="text-primary-600 text-2xl font-semibold"> Voraussichtlicher Preis </h2>
            <p className="text-primary-500 mb-4">
                Der angezeigte Preis ist eine Schätzung. Der genaue Preis wird bei der bestätigten Buchung angezeigt.{' '}
            </p>
        </div>
    )
}

export default PricePrediction
