import { useGreeting } from './greeting'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import axiosConfig from '../networking/axiosConfig'

beforeEach(axiosConfig)

test('greeting hook works as expected', async () => {
    const { result } = renderHook(useGreeting)
    expect(result.current.greetings.length).toBe(0)

    await act(async () => await result.current.fetch('hello'))

    expect(result.current.greetings.length).toBe(1)
})
