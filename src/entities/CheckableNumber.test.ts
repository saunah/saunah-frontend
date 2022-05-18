import { CheckableNumber } from './CheckableNumber'

describe('CheckableNumber', () => {
    test('mapFromNumber() works correctly', () => {
        expect(CheckableNumber.mapFromNumber(null)).toMatchObject({ checked: false, number: null })
        expect(CheckableNumber.mapFromNumber(0)).toMatchObject({ checked: false, number: 0 })
        expect(CheckableNumber.mapFromNumber(1)).toMatchObject({ checked: true, number: 1 })
    })

    test('mapToNumber() works correctly', () => {
        expect(CheckableNumber.mapToNumber({ checked: true, number: 0 })).toBe(0)
        expect(CheckableNumber.mapToNumber({ checked: true, number: null })).toBe(0)
        expect(CheckableNumber.mapToNumber({ checked: true, number: 1 })).toBe(1)
        expect(CheckableNumber.mapToNumber({ checked: false, number: 1 })).toBe(0)
    })
})
