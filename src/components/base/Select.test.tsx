import { render, screen, fireEvent } from '@testing-library/react'
import Select from './Select'

describe('<Select>', () => {
    const values = ['One', 'Two', 'Three']
    const defaultOnChange = jest.fn()
    const label = 'My Select'

    test('shows label correctly', () => {
        render(<Select name={label} values={values} selected="Two" onChange={defaultOnChange} />)
        expect(getLabel()).toHaveTextContent(label)
        expect(getLabel()).toHaveProperty('htmlFor', label)
        expect(getSelect()).toHaveProperty('name', label)
    })

    test('displays value correctly', () => {
        render(<Select values={values} selected="Two" onChange={defaultOnChange} />)
        expect(getSelect()).toHaveValue('Two')
    })

    test('calls onChange if input changes', () => {
        const onChange = jest.fn()
        render(<Select values={values} selected="Two" onChange={onChange} />)
        fireEvent.change(getSelect(), { target: { value: 'Three' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith('Three')
    })

    test('does not call onChange if new vlaue is not inside values', () => {
        const onChange = jest.fn()
        render(<Select values={values} selected="Two" onChange={onChange} />)
        fireEvent.change(getSelect(), { target: { value: 'Other' } })
        expect(onChange).toBeCalledTimes(0)
    })

    test('does not set disabled if not set', () => {
        render(<Select values={values} selected="Two" onChange={defaultOnChange} />)
        expect(getSelect()).not.toHaveProperty('disabled', true)
    })

    test('sets disabled if set', () => {
        render(<Select values={values} selected="Two" onChange={defaultOnChange} disabled />)
        expect(getSelect()).toHaveProperty('disabled', true)
    })

    const getSelect = () => screen.getByTestId('select')
    const getLabel = () => screen.getByTestId('label')
})
