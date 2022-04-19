import { useGreeting } from './greeting'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { Greeting } from '../entities/Greeting'
import { mockGreetingAPI } from '../networking/api'

/*
 * This is an example for hook-testing.
 * The api which the hook will uses has to be mocked.
 * Then the behaviour of the hook can be tested.
 */

const defaultMock = () => ({
    get: jest.fn(async (name: string) => ({ name, content: `Hello ${name}!` })),
    save: jest.fn(async (greeting: Greeting) => ({ name: 'Michael', content: greeting.content })),
})

test('greeting hook fetches correctly', async () => {
    mockGreetingAPI(defaultMock())

    const { result } = renderHook(useGreeting)
    expect(result.current.greetings.length).toBe(0)

    await act(async () => await result.current.fetch('Michael'))

    expect(result.current.greetings.length).toBe(1)
    expect(result.current.greetings[0]).toMatchObject({ name: 'Michael', content: 'Hello Michael!' })
})

test('save greeting', async () => {
    const mock = mockGreetingAPI(defaultMock())

    const newGreeting: Greeting = { name: 'Michael', content: 'Hoi!' }

    const { result } = renderHook(useGreeting)
    await act(async () => await result.current.save(newGreeting))

    expect(mock.save).toBeCalledTimes(1)
    expect(mock.save).toBeCalledWith(newGreeting)
    expect(result.current.greetings[0]).toMatchObject({ name: 'Michael', content: newGreeting.content })

    await act(async () => await result.current.save(newGreeting))
})
