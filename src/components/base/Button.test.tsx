import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('<Button>', () => {
    test('shows title', () => {
        render(<Button title="Test Title" />)
        const button = screen.getByTestId('button')
        expect(button).toHaveTextContent('Test Title')
    })

    test('shows children insted of title', () => {
        render(<Button title="Test Title"> Test Child </Button>)
        const button = screen.getByTestId('button')
        expect(button).toHaveTextContent('Test Child')
        expect(screen.queryByText('Test Title')).toBeNull()
    })

    test('onClick event is called', () => {
        const onClick = jest.fn()
        render(<Button title="Click me" onClick={onClick} />)
        const button = screen.getByTestId('button')
        fireEvent.click(button)
        expect(onClick).toBeCalledTimes(1)
    })

    test('disabled property prevents click', () => {
        const onClick = jest.fn()
        render(<Button title="Click me" disabled={true} onClick={onClick} />)
        const button = screen.getByTestId('button')
        fireEvent.click(button)
        expect(onClick).toBeCalledTimes(0)
    })
})
