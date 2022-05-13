export namespace CheckableNumber {
    export type Request = {
        checked: boolean
        number: number | null
    }

    export function emptyRequest(): Request {
        return {
            checked: false,
            number: null,
        }
    }

    export function mapFromNumber(number: number | null): Request {
        return {
            checked: !!number,
            number: number,
        }
    }

    export function mapToNumber(number: Request): number {
        if (!number.checked) return 0
        else return number.number || 0
    }

    type Keys<T> = { [P in keyof T]: T[P] extends Request ? P : never }[keyof T]
    export type Extract<T> = Pick<T, Keys<T>>

    /**
     * This type can be used if a types numbers should be edited by checkboxes and text-fields.
     * This makes all number properties of the object of type CheckableNumber.
     */
    export type Object<T> = {
        readonly [K in keyof T]: T[K] extends number ? Request : T[K]
    }
}
