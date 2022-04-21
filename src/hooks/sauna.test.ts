import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { Sauna } from '../entities/Sauna'
import { mockSaunaAPI } from '../networking/api'
import { containsId, findId, Id } from '../utils/identifiable'
import { useSauna } from './sauna'

const defaultMock = (mockSaunas?: Sauna.Response[]) => {
    const data = mockSaunas || saunas

    return {
        list: jest.fn(() => Promise.resolve(data)),
        get: jest.fn((id: Id) => {
            const found = findId(data, id)
            return found ? Promise.resolve(found) : Promise.reject('Not found')
        }),
        add: jest.fn(() => Promise.resolve()),
        edit: jest.fn(() => Promise.resolve()),
        remove: jest.fn(() => Promise.resolve()),
    }
}

describe('sauna hook', () => {
    test('fetches all saunas correctly', async () => {
        const mock = mockSaunaAPI(defaultMock())

        const { result } = renderHook(useSauna)
        expect(result.current.saunas.length).toBe(0)

        await act(() => result.current.fetchAll())
        expect(mock.list).toBeCalledTimes(1)
        expect(result.current.saunas.length).toBe(3)
        expect(containsId(result.current.saunas, 1)).toBe(true)
        expect(containsId(result.current.saunas, 2)).toBe(true)
        expect(containsId(result.current.saunas, 3)).toBe(true)
    })

    test('fetches single saunas correctly', async () => {
        const mock = mockSaunaAPI(defaultMock())

        const { result } = renderHook(useSauna)
        expect(result.current.saunas.length).toBe(0)

        await act(() => result.current.fetch(1))
        expect(result.current.saunas.length).toBe(1)
        expect(containsId(result.current.saunas, 1)).toBe(true)
        expect(mock.get).toBeCalledTimes(1)
        expect(mock.get).toBeCalledWith(1)

        await act(() => result.current.fetch(2))
        expect(result.current.saunas.length).toBe(2)
        expect(containsId(result.current.saunas, 2)).toBe(true)
        expect(findId(result.current.saunas, 2)?.name).toBe('Sauna 2')
        expect(mock.get).toBeCalledTimes(2)
        expect(mock.get).toBeCalledWith(2)

        // test fetching of invalid id
        await expect(async () => await act(() => result.current.fetch(10))).rejects.toBe('Not found')

        // test if same id item is overwritten, not just added
        mockSaunaAPI(defaultMock([{ ...sauna2, name: 'Sauna 2 new' }]))
        await act(() => result.current.fetch(2))
        expect(result.current.saunas.length).toBe(2)
        expect(findId(result.current.saunas, 2)?.name).toBe('Sauna 2 new')
    })

    test('saves saunas correctly', async () => {
        const mock = mockSaunaAPI(defaultMock())

        const { result } = renderHook(useSauna)
        await act(() => result.current.save({ ...sauna1, id: null }))
        expect(mock.add).toBeCalledTimes(1)
        expect(mock.edit).toBeCalledTimes(0)
        expect(mock.list).toBeCalledTimes(1)

        await act(() => result.current.save({ ...sauna2 }))
        expect(mock.add).toBeCalledTimes(1)
        expect(mock.edit).toBeCalledTimes(1)
        expect(mock.list).toBeCalledTimes(2)
    })

    test('removes saunas correctly', async () => {
        const mock = mockSaunaAPI(defaultMock())

        const { result } = renderHook(useSauna)
        await act(() => result.current.fetchAll())
        expect(result.current.saunas.length).toBe(3)

        await act(() => result.current.remove(2))
        expect(result.current.saunas.length).toBe(2)
        expect(containsId(result.current.saunas, 2)).toBe(false)
        expect(mock.remove).toBeCalledTimes(1)
        expect(mock.remove).toBeCalledWith(2)

        await act(() => result.current.remove(1))
        expect(result.current.saunas.length).toBe(1)
        expect(containsId(result.current.saunas, 3)).toBe(true)
        expect(mock.remove).toBeCalledTimes(2)
        expect(mock.remove).toBeCalledWith(1)
    })
})

const sauna1: Sauna.Response = {
    id: 1,
    name: 'Sauna 1',
    description: 'Das ist Sauna 1.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: false,
}

const sauna2: Sauna.Response = {
    id: 2,
    name: 'Sauna 2',
    description: 'Das ist Sauna 2.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: false,
}

const sauna3: Sauna.Response = {
    id: 3,
    name: 'Sauna 3',
    description: 'Das ist Sauna 3.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: false,
}

const saunas = [sauna1, sauna2, sauna3]
