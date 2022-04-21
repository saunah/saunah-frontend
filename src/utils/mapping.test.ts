import { emptyString, emptyBoolean, emptyNumber, mapInOptional } from './mapping'

describe('mappings', () => {
    test('emptyString() returns null', () => {
        expect(emptyString()).toBeNull()
    })

    test('emptyBoolean() returns null', () => {
        expect(emptyBoolean()).toBeNull()
    })

    test('emptyNumber() returns null', () => {
        expect(emptyNumber()).toBeNull()
    })

    test('mapInOptional() maps correctly', () => {
        const mapper = (number: number) => number.toString()
        let number: number | null | undefined = 0
        expect(mapInOptional(number, mapper)).toBe('0')
        number = 1
        expect(mapInOptional(number, mapper)).toBe('1')
        number = null
        expect(mapInOptional(number, mapper)).toBeNull()
        number = undefined
        expect(mapInOptional(number, mapper)).toBeNull()
    })
})
