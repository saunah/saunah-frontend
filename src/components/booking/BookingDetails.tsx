import { Booking } from '../../entities/Booking'
import { BookingState } from '../../entities/BookingState'
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
            <p className="text-primary-500 mb-4">{getBookingStateDescription(booking.state)}</p>
            <List items={listItems} />
        </div>
    )
}

export default BookingDetails

export type BookingDetailsProps = {
    booking: Booking.Response
}

function getBookingStateDescription(state: BookingState): string {
    switch (state) {
        case BookingState.OPENED:
            return 'Die Buchung wird von einem Mitarbeiter von SauNah überprüft. Sobald alle Angaben kontrolliert wurden erhalten Sie eine Bestätigungsemail.'
        case BookingState.APPROVED:
            return 'Die Buchung findet am vereinbarten Datum statt. Bitte melden Sie sich direkt bei SauNah, falls Sie noch etwas an der Buchung anpassen möchten.'
        case BookingState.CANCELED:
            return 'Die Buchung wurde storniert.'
    }
}
