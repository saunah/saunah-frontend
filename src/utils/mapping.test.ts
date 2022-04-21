import { emptyString, emptyBoolean, emptyNumber, mapInOptional, mapInArray } from './mapping'

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

    test('mapInArray() maps correctly', () => {
        const mapper = (number: unknown) => {
            if (typeof number != 'number') throw Error()
            else return number.toString()
        }
        let array: unknown = [10, 12, 13]
        expect(mapInArray(array, mapper)).toMatchObject(['10', '12', '13'])
        array = []
        expect(mapInArray(array, mapper)).toMatchObject([])
        array = {}
        expect(() => mapInArray(array, mapper)).toThrow()
        array = [10, '12', 13]
        expect(() => mapInArray(array, mapper)).toThrow()
    })
})
