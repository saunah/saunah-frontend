import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('<Checkbox>', () => {
    test('is checked when value set to true', () => {
        render(<Checkbox value={true} />)
        expect(getCheckbox()).toHaveProperty('checked', true)
        expect(getCheckIcon()).toBeInTheDocument()
    })

    test('is not checked when value set to false', () => {
        render(<Checkbox value={false} />)
        expect(getCheckbox()).toHaveProperty('checked', false)
        expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()
    })

    test('calls onChange with true when value is false', () => {
        const onChange = jest.fn()
        render(<Checkbox value={false} onChange={onChange} />)

        fireEvent.click(getCheckbox())
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(true)

        fireEvent.click(getWrapper())
        expect(onChange).toBeCalledTimes(2)
        expect(onChange).toBeCalledWith(true)
    })

    test('calls onChange with false when value is true', () => {
        const onChange = jest.fn()
        render(<Checkbox value={true} onChange={onChange} />)

        fireEvent.click(getCheckbox())
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(false)

        fireEvent.click(getWrapper())
        expect(onChange).toBeCalledTimes(2)
        expect(onChange).toBeCalledWith(false)
    })

    test('does not call onChange when disabled', () => {
        const onChange = jest.fn()
        render(<Checkbox value={false} disabled={true} onChange={onChange} />)

        fireEvent.click(getWrapper())
        expect(onChange).toBeCalledTimes(0)

        // click on checkbox triggers onChange even if checkbox is disabled
        // so just check if the disabled property is set on the checkbox
        expect(getCheckbox()).toHaveProperty('disabled', true)
    })

    test('value is never undefined, default is false', () => {
        render(<Checkbox />)
        expect(getCheckbox()).not.toBeChecked()
    })
})

const getCheckbox = () => screen.getByTestId('checkbox')
const getCheckIcon = () => screen.getByTestId('check-icon')
const getWrapper = () => screen.getByTestId('checkbox-wrapper')
