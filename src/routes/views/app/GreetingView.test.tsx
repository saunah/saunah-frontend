import { render, screen } from '@testing-library/react'
import { Greeting } from '../../../entities/Greeting'
import { mockGreetingAPI } from '../../../networking/api'
import GreetingView from './GreetingView'

/*
 * This is an example of a view test.
 * As the view calls the hook which calls the api, the api has to be mocked. See greeting-hook test.
 * A view test should check if the correct api calls are made, if the components are at the right place
 * and if the empty state of the view (if no data is available) is correctly displayed.
 */

const defaultMock = () => ({
    get: jest.fn(async (name: string) => ({ id: 0, content: 'Hello test-user', numberOfLikes: 0, date: new Date() })),
    save: jest.fn(async (greeting: Greeting.Edit) => Promise.reject()),
})

test('GreetingView shows greeting', async () => {
    const mock = mockGreetingAPI(defaultMock())
    render(<GreetingView />)
    expect(mock.get).toBeCalledTimes(1)
    await screen.findByText('Hello test-user')
})
