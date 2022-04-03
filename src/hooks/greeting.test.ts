import { useGreeting } from './greeting'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { Greeting } from '../entities/Greeting'

const createMockApi = () => ({
    get: jest.fn(async (name: string) => ({ id: 3, content: `Hello ${name}!` })),
    save: jest.fn(async (greeting: Greeting) => ({ id: 10101, content: greeting.content })),
})

test('greeting hook fetches correctly', async () => {
    const api = createMockApi()

    const { result } = renderHook(() => useGreeting(api))
    expect(result.current.greetings.length).toBe(0)

    await act(async () => await result.current.fetch('Michael'))

    expect(result.current.greetings.length).toBe(1)
    expect(result.current.greetings[0]).toMatchObject({ id: 3, content: 'Hello Michael!' })
})

test('save greeting', async () => {
    const api = createMockApi()

    const newGreeting: Greeting = { id: 7, content: 'Hoi!' }

    const { result } = renderHook(() => useGreeting(api))
    await act(async () => await result.current.save(newGreeting))

    expect(api.save).toBeCalledTimes(1)
    expect(api.save).toBeCalledWith(newGreeting)
    expect(result.current.greetings[0]).toMatchObject({ id: 10101, content: newGreeting.content })

    await act(async () => await result.current.save(newGreeting))
})
