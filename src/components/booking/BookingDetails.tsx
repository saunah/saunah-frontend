import { Booking } from '../../entities/Booking'
import List, { ListItem } from '../base/List'

const BookingDetails = ({ booking }: BookingDetailsProps) => {
    const listItems: ListItem[] = [
        { title: 'Start der Buchung', text: booking.startBookingDate.format('dddd, DD.MM.YYYY HH:mm') },
        { title: 'Ende der Buchung', text: booking.endBookingDate.format('dddd, DD.MM.YYYY HH:mm') },
        { title: 'Wunschort', text: booking.location },
        { title: 'Bemerkungen', text: booking.comment },
    ]

    if (booking.discountDescription) listItems.push({ title: 'Preisanpassung', text: booking.discountDescription })

    return (
        <div>
            Status ist: {booking.state}
            <List items={listItems} />
        </div>
    )
}

export default BookingDetails

export type BookingDetailsProps = {
    booking: Booking.Response
}
