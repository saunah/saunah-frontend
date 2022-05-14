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

    export function mapFromMoment(date: Moment, withTime = true): Request {
        return {
            date: date.format('YYYY-MM-DD'),
            time: withTime ? date.format('HH:mm') : null,
        }
    }

    export function mapToMoment(date: Request): Moment | null {
        if (date.date && date.time) {
            return moment(`${date.date} ${date.time}`, 'YYYY-MM-DD HH:mm')
        } else if (date.date) {
            return moment.utc(date.date, 'YYYY-MM-DD')
        } else return null
    }

    export function mapOut(date: Request): string | null {
        return mapToMoment(date)?.toISOString() || null
    }

    type Keys<T> = { [P in keyof T]: T[P] extends Request ? P : never }[keyof T]
    export type Extract<T> = Pick<T, Keys<T>>

    /**
     * This type makes all moment properties of an object to a ModifiableDate.Request.
     */
    export type Object<T> = { [P in keyof T]: T[P] extends Moment ? Request : T[P] }
}
