import { render, screen, fireEvent } from '@testing-library/react'
import CheckboxLabel from './CheckboxLabel'

describe('<CheckboxLabel>', () => {
    test('shows label and description correctly', () => {
        render(<CheckboxLabel label="Hello label" details="Hello details" />)
        expect(getLabel()).toHaveTextContent('Hello label')
        expect(getDetails()).toHaveTextContent('Hello details')
    })

    test('calls onChange when clicked on label or description', () => {
        const onChange = jest.fn()
        render(<CheckboxLabel value={true} label="hi" details="ho" onChange={onChange} />)
        fireEvent.click(getLabel())
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(false)

        fireEvent.click(getDetails())
        expect(onChange).toBeCalledTimes(2)
        expect(onChange).toBeCalledWith(false)
    })

    test('does not call onChange when disabled', () => {
        const onChange = jest.fn()
        render(<CheckboxLabel value={true} label="hi" details="ho" disabled={true} onChange={onChange} />)
        fireEvent.click(getLabel())
        expect(onChange).toBeCalledTimes(0)

        fireEvent.click(getDetails())
        expect(onChange).toBeCalledTimes(0)
    })
})

const getLabel = () => screen.getByTestId('checkbox-label')
const getDetails = () => screen.getByTestId('checkbox-details')
