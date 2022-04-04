import { render, screen, fireEvent } from '@testing-library/react'
import { Greeting } from '../../entities/Greeting'
import GreetingPrompt from './GreetingPrompt'

/*
 * This is an example of a unit test.
 * The component does not do api-calls on it's own, so it can be controlled completely via it's props.
 * We should try to use this form of testing for all components if possible.
 * Only views should make api-calls, as this is much harder to test.
 */

const testGreeting: Greeting = {
    id: 4,
    content: 'Hello there',
}

test('displays greeting correctly', () => {
    render(<GreetingPrompt greeting={testGreeting} />)
    const prompt = screen.getByText(testGreeting.content)
    expect(prompt).toBeInTheDocument()
})

test('displays no greeting correctly', () => {
    render(<GreetingPrompt />)
    const prompt = screen.getByText('Nobody', { exact: false })
    expect(prompt).toBeInTheDocument()
})

test('click event is handled correctly', () => {
    const onClick = jest.fn()
    render(<GreetingPrompt onClick={onClick} />)
    const button = screen.getByText('Click me!')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
})
