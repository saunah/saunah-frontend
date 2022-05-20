export enum BookingState {
    OPENED = 'OPENED',
    APPROVED = 'APPROVED',
    CANCELED = 'CANCELED',
}

export const allBookingStates = [BookingState.OPENED, BookingState.APPROVED, BookingState.CANCELED]

export function trslBookingState(state: BookingState): string {
    switch (state) {
        case BookingState.OPENED:
            return 'Offen'
        case BookingState.APPROVED:
            return 'Bestätigt'
        case BookingState.CANCELED:
            return 'Storniert'
    }
}
