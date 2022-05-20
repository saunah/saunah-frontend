import { BookingState, trslBookingState } from '../../entities/BookingState'

const BookingStateBadge = (props: BookingStateBadgeProps) => {
    const color = getColorForBookingState(props.state)

    const fontSize = props.small ? 'text-xs' : 'text-sm'

    return (
        <div
            className={`${fontSize} px-4 py-2 font-medium rounded-xl shadow-lg shadow-primary-900/[0.1]  text-${color}-900 bg-${color}-200 uppercase`}
        >
            {trslBookingState(props.state)}
        </div>
    )
}

export default BookingStateBadge

export type BookingStateBadgeProps = {
    state: BookingState
    small?: boolean
}

function getColorForBookingState(state: BookingState): string {
    switch (state) {
        case BookingState.OPENED:
            return 'blue'
        case BookingState.APPROVED:
            return 'green'
        case BookingState.CANCELED:
            return 'red'
    }
}
