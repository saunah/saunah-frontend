import { Link } from 'react-router-dom'
import { Booking } from '../../entities/Booking'
import { BookingState } from '../../entities/BookingState'
import { User } from '../../entities/User'
import List, { ListItem } from '../base/List'

const BookingDetails = ({ booking, user }: BookingDetailsProps) => {
    const listItems: ListItem[] = []

    if (user)
        listItems.push({
            title: 'Benutzer',
            text: <Link to={`/users/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>,
        })

    listItems.push(
        { title: 'Start der Buchung', text: booking.startBookingDate.format('dddd, DD.MM.YYYY HH:mm') },
        { title: 'Ende der Buchung', text: booking.endBookingDate.format('dddd, DD.MM.YYYY HH:mm') },
        { title: 'Wunschort', text: booking.location },
        { title: 'Bemerkungen', text: booking.comment }
    )

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
    user?: User.Response
}

function getBookingStateDescription(state: BookingState): string {
    switch (state) {
        case BookingState.OPENED:
            return 'Die Buchung wird von einem Mitarbeiter von SauNah überprüft. Sobald alle Angaben kontrolliert wurden erhalten Sie eine Bestätigungsemail.'
        case BookingState.APPROVED:
            // TODO: How does payment work?
            return 'Die Buchung findet am vereinbarten Datum statt. Bitte bezahlen Sie den berechneten Betrag bis eine Woche vor dem Start der Buchung. Falls Sie noch etwas an der Buchung anpassen möchten, können Sie sich direkt bei Saunah melden.'
        case BookingState.CANCELED:
            return 'Die Buchung wurde storniert.'
    }
}
