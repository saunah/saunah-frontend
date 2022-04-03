import { render, screen } from '@testing-library/react'
import { Greeting } from '../../../entities/Greeting'
import { mockGreetingAPI } from '../../../networking/api'
import GreetingView from './GreetingView'

const defaultMock = () => ({
    get: jest.fn(async (name: string) => ({ id: 0, content: 'Hello test-user' })),
    save: jest.fn(async (greeting: Greeting) => greeting),
})

test('GreetingView shows greeting', async () => {
    const mock = mockGreetingAPI(defaultMock())
    render(<GreetingView />)

    expect(mock.get).toBeCalledTimes(1)

    await screen.findByText('Hello test-user')
})

// const notFoundMock = () => ({
//     get: jest.fn(async (name: string) => Promise.reject()),
//     save: jest.fn(async (greeting: Greeting) => greeting),
// })

// test('GreetingView shows empty greeting', async () => {
//     const mock = mockGreetingAPI(notFoundMock())
//     render(<GreetingView />)

//     expect(mock.get).toBeCalledTimes(1)

//     await screen.findByText('Nobody is here.')
// })
