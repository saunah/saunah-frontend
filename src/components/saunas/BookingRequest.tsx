import { Booking } from '../../entities/Booking'
import Button from '../base/Button'
import Checkbox from '../base/Checkbox'
import CheckboxLabel from '../base/CheckboxLabel'
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
            <div className="grid gap-4">
                <Input
                    name="Wunschort der Sauna"
                    value={booking.location}
                    onChange={newValue => props.onChange?.({ ...booking, location: newValue })}
                />
                <div className="grid gap-4 grid-cols-2">
                    <Checkbox //calender?
                        value={booking.washService}
                        onChange={newValue => props.onChange?.({ ...booking, washService: newValue })}
                    />
                    <span>Reinigung der Sauna 50CHF</span>

                    <Checkbox
                        value={booking.deposit}
                        onChange={newValue => props.onChange?.({ ...booking, deposit: newValue })}
                    />
                    <span>Kaution</span>
                    <Checkbox
                        value={booking.handTowel}
                        onChange={newValue => props.onChange?.({ ...booking, deposit: newValue })}
                    />
                    <Input
                        name="Handtuch"
                        value={'' + booking.handTowel}
                        type="number"
                        //onChange={newValue => props.onChange?.({ ...booking, handTowel: newValue })}
                    />
                </div>

                <CheckboxLabel
                    label="Kaution"
                    details="100 CHF"
                    value={booking.deposit}
                    onChange={newValue => props.onChange?.({ ...booking, deposit: newValue })}
                    disabled={true}
                />
            </div>
            <Button className="mt-6" title="Buchen" data-testid="submit-button" onClick={props.onSubmit} />
        </div>
    )
}

export default BookingRequest
