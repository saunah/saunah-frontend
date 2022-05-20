import moment from 'moment'
import { ModifiableDate } from './ModifiableDate'

const testMoment = moment('01.02.2013 17:20', 'DD.MM.YYYY HH:mm')

describe('ModifiableDate', () => {
    test('mapFromMoment() works correctly', () => {
        expect(ModifiableDate.mapFromMoment(testMoment)).toMatchObject({ date: '2013-02-01', time: '17:20' })
        expect(ModifiableDate.mapFromMoment(testMoment, false)).toMatchObject({ date: '2013-02-01', time: null })
    })

    test('mapToMoment() works correctly', () => {
        expect(ModifiableDate.mapToMoment({ date: '2013.02.01', time: '17:20' })?.format('DD.MM.YYYY HH:mm')).toBe(
            '01.02.2013 17:20'
        )

        expect(ModifiableDate.mapToMoment({ date: '2013.02.01', time: null })?.toISOString()).toBe(
            '2013-02-01T00:00:00.000Z'
        )

        expect(ModifiableDate.mapToMoment({ date: '', time: null })).toBe(null)
    })

    test('mapOut() works correctly', () => {
        expect(ModifiableDate.mapOut({ date: '2013.02.01', time: null })).toBe('2013-02-01T00:00:00.000Z')
    })
})
