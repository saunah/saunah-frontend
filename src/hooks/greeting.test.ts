import { useGreeting } from './greeting'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { Greeting } from '../entities/Greeting'
import { mockGreetingAPI } from '../networking/api'

const defaultMock = () => ({
    get: jest.fn(async (name: string) => ({ id: 3, content: `Hello ${name}!` })),
    save: jest.fn(async (greeting: Greeting) => ({ id: 10101, content: greeting.content })),
})

test('greeting hook fetches correctly', async () => {
    mockGreetingAPI(defaultMock())

    const { result } = renderHook(useGreeting)
    expect(result.current.greetings.length).toBe(0)

    await act(async () => await result.current.fetch('Michael'))

    expect(result.current.greetings.length).toBe(1)
    expect(result.current.greetings[0]).toMatchObject({ id: 3, content: 'Hello Michael!' })
})

test('save greeting', async () => {
    const mock = mockGreetingAPI(defaultMock())

    const newGreeting: Greeting = { id: 7, content: 'Hoi!' }

    const { result } = renderHook(useGreeting)
    await act(async () => await result.current.save(newGreeting))

    expect(mock.save).toBeCalledTimes(1)
    expect(mock.save).toBeCalledWith(newGreeting)
    expect(result.current.greetings[0]).toMatchObject({ id: 10101, content: newGreeting.content })

    await act(async () => await result.current.save(newGreeting))
})