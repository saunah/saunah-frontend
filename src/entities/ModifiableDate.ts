import moment, { Moment } from 'moment'

export namespace ModifiableDate {
    export interface Request {
        date: string
        time: string | null
    }

    export function emptyRequest(): Request {
        return {
            date: '',
            time: null,
        }
    }

    export function mapFromMoment(moment: Moment, withTime?: boolean): Request {
        return {
            date: moment.format('YYYY-MM-DD'),
            time: withTime ? moment.format('HH:mm') : null,
        }
    }

    export function mapToMoment(date: Request): Moment | null {
        if (date.date && date.time) {
            return moment(`${date.date} ${date.time}`, 'YY-MM-DD HH:mm')
        } else if (date.date) {
            return moment.utc(date.date, 'YYYY-MM-DD')
        } else return null
    }

    export function mapOut(date: Request, ignoreTime = false): string | null {
        return mapToMoment(date)?.toISOString() || null
    }

    type Keys<T> = { [P in keyof T]: T[P] extends Request ? P : never }[keyof T]
    export type Extract<T> = Pick<T, Keys<T>>
}