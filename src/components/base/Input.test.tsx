import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('<Input>', () => {
    test('shows label correctly', () => {
        render(<Input name="Phone Number" />)
        const label = screen.getByTestId('label')
        expect(label).toHaveTextContent('Phone Number')
    })

    test('displays value and placeholder in input-field', () => {
        render(<Input value="hello" placeholder="placer" />)
        const input = screen.getByTestId('input')
        expect(input).toHaveValue('hello')
        expect(input).toHaveProperty('placeholder', 'placer')
    })

    test('calls onChange if input changes', () => {
        const onChange = jest.fn()
        render(<Input onChange={onChange} />)
        const input = screen.getByTestId('input')
        fireEvent.change(input, { target: { value: 'new-value' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith('new-value')
    })
})
