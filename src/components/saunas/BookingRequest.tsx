import { Booking } from '../../entities/Booking'
import Button from '../base/Button'
import Checkbox from '../base/Checkbox'
import Dropdown from '../base/Dropdown'
import Input from '../base/Input'

export type BookingRequestProps = {
    value: Booking.Request
    onChange?: (newValue: Booking.Request) => void
    onSubmit?: () => void
}

const BookingRequest = (props: BookingRequestProps) => {
    const booking = props.value

    return (
        <div data-testid="booking-request">
            <div className="space-y-2">
                <Checkbox value={false} disabled={false} />
            </div>
            <Button className="mt-6" title="Buchen" data-testid="submit-button" onClick={props.onSubmit} />
        </div>
    )
}

export default BookingRequest
