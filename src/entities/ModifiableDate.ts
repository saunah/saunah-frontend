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

    export function mapOut(date: Request, ignoreTime = false): string {
        if (date.date) return formatOutDate(date.date, ignoreTime ? null : date.time)
        else return ''
    }

    type Keys<T> = { [P in keyof T]: T[P] extends Request ? P : never }[keyof T]
    export type Extract<T> = Pick<T, Keys<T>>
}

function formatOutDate(date: string, time?: string | null): string {
    let parsedDate: Moment

    if (date && time) {
        parsedDate = moment(`${date} ${time}`, 'YY-MM-DD HH:mm')
    } else if (date) {
        parsedDate = moment.utc(date, 'YYYY-MM-DD')
    } else return ''

    return parsedDate.toISOString()
}
