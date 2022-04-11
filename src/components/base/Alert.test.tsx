import { render, screen, fireEvent } from '@testing-library/react'
import Alert from './Alert'

describe('<Alert>', () => {
    test('displays text correctly', () => {
        render(<Alert text="Hello alert" />)
        expect(getText()).toHaveTextContent('Hello alert')
    })

    test('displays children instead of text', () => {
        render(<Alert text="this is text">this is child</Alert>)
        expect(screen.queryByText('this is text')).not.toBeInTheDocument()
        expect(getText()).toHaveTextContent('this is child')
    })

    test('onDismiss is called', () => {
        const onDismiss = jest.fn()
        render(<Alert onDismiss={onDismiss} />)
        fireEvent.click(getDismissButton())
        expect(onDismiss).toBeCalledTimes(1)
    })
})

const getText = () => screen.getByTestId('alert-text')
const getDismissButton = () => screen.getByTestId('icon-button')
