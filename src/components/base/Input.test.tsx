import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('<Input>', () => {
    test('shows label correctly', () => {
        render(<Input name="Phone Number" />)
        expect(getLabel()).toHaveTextContent('Phone Number')
        expect(getLabel()).toHaveProperty('htmlFor', 'Phone Number')
        expect(getInput()).toHaveProperty('name', 'Phone Number')
    })

    test('displays value and placeholder in input-field', () => {
        render(<Input value="hello" placeholder="placer" />)
        expect(getInput()).toHaveValue('hello')
        expect(getInput()).toHaveProperty('placeholder', 'placer')
    })

    test('calls onChange if input changes', () => {
        const onChange = jest.fn()
        render(<Input onChange={onChange} />)
        fireEvent.change(getInput(), { target: { value: 'new-value' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith('new-value')
    })

    test('sets other properties correctly', () => {
        render(<Input autoComplete="currentPassword" type="number" disabled={true} />)
        expect(getInput()).toHaveAttribute('autoComplete', 'currentPassword')
        expect(getInput()).toHaveProperty('type', 'number')
        expect(getInput()).toHaveProperty('disabled', true)
    })
})

const getInput = () => screen.getByTestId('input')
const getLabel = () => screen.getByTestId('label')
