export interface Alert {
    text: string
    variant: AlertVariant
    duration?: AlertDuration
}

export type AlertVariant = 'success' | 'info' | 'warning' | 'error'

export type ControlledAlert = Alert & {
    id: number
    remove: () => void
}

export enum AlertDuration {
    SHORT = 3000,
    LONG = 4500,
}
