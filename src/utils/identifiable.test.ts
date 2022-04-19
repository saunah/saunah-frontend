import { containsId, findId, insert, removeId } from './identifiable'

const ITEM_1 = { id: 1, name: 'Item 1' }
const ITEM_1_OTHER = { id: 1, name: 'Item 1 other' }

const ITEM_2 = { id: 2, name: 'Item 2' }
const ITEM_2_OTHER = { id: 2, name: 'Item 2 other' }

const ITEM_3 = { id: 3, name: 'Item 3' }
const ITEM_3_OTHER = { id: 3, name: 'Item 3 other' }

describe('identifiable', () => {
    test('insert works as expected', () => {
        let result = [ITEM_1, ITEM_2]
        result = insert(result, ITEM_3)
        expect(result).toMatchObject([ITEM_1, ITEM_2, ITEM_3])

        result = insert(result, ITEM_3)
        expect(result).toMatchObject([ITEM_1, ITEM_2, ITEM_3])

        result = insert(result, ITEM_2_OTHER)
        expect(result).toMatchObject([ITEM_1, ITEM_2_OTHER, ITEM_3])

        result = insert(result, ITEM_1_OTHER, ITEM_3_OTHER)
        expect(result).toMatchObject([ITEM_1_OTHER, ITEM_2_OTHER, ITEM_3_OTHER])
    })

    test('removeId works as expected', () => {
        let result = [ITEM_1, ITEM_2, ITEM_3, ITEM_3]
        result = removeId(result, 2)
        expect(result).toMatchObject([ITEM_1, ITEM_3, ITEM_3])

        result = removeId(result, 3)
        expect(result).toMatchObject([ITEM_1])
    })

    test('findId works as expected', () => {
        let base = [ITEM_1, ITEM_3]
        expect(findId(base, 1)).toMatchObject(ITEM_1)
        expect(findId(base, 2)).toBeNull()
        expect(findId(base, 3)).toMatchObject(ITEM_3)
    })

    test('containsId works as expected', () => {
        let base = [ITEM_1, ITEM_3]
        expect(containsId(base, 1)).toBeTruthy()
        expect(containsId(base, 2)).toBeFalsy()
        expect(containsId(base, 3)).toBeTruthy()
    })
})
