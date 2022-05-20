import { fireEvent, render, screen, within } from '@testing-library/react'
import { Price } from '../../entities/Price'
import PriceEditor from './PriceEditor'

const testPrice: Price.Request = {
    id: null,
    transportService: '1',
    washService: '2',
    saunahImp: '3',
    deposit: '4',
    handTowel: '5',
    wood: '6',
}

const edited: Price.Request = {
    id: null,
    transportService: '11',
    washService: '22',
    saunahImp: '33',
    deposit: '44',
    handTowel: '55',
    wood: '66',
}

const ignoreKeys = ['id']

describe('<PriceEditor>', () => {
    test('properties are assigned to inputs correctly', () => {
        render(<PriceEditor value={testPrice} />)

        Object.keys(testPrice).forEach(key => {
            if (ignoreKeys.includes(key)) return
            const input = getInputField(key)
            expect(input).toBeInTheDocument()
            expect(input).toHaveDisplayValue((testPrice as any)[key])
        })
    })

    test('onChange is called correctly', () => {
        const onChange = jest.fn()
        render(<PriceEditor value={testPrice} onChange={onChange} />)

        Object.entries(edited).forEach(([key, value]) => {
            if (ignoreKeys.includes(key)) return
            fireEvent.change(getInputField(key), { target: { value: value } })
            expect(onChange).toBeCalledTimes(1)
            expect(onChange).toBeCalledWith({ ...testPrice, [key]: value })
            onChange.mockReset()
        })
    })

    test('onSubmit is called', () => {
        const onSubmit = jest.fn()
        render(<PriceEditor value={testPrice} onSubmit={onSubmit} />)
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(onSubmit).toBeCalledTimes(1)
    })
})

const getInputField = (key: string) => {
    const input = screen.getByTestId(`input-${key}`)
    return within(input).getByTestId('input')
}
