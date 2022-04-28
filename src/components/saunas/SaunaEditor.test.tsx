import { fireEvent, render, screen, within } from '@testing-library/react'
import { Sauna } from '../../entities/Sauna'
import SaunaEditor from './SaunaEditor'

const testSauna: Sauna.Request = {
    id: 11,
    name: 'Test Sauna ',
    description: 'Hoi Sauna.',
    price: 999,
    maxTemp: 99,
    numberOfPeople: 9,
    street: 'Oberstr. 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: true,
}

const edited = {
    name: 'Test Edited',
    description: 'Hoi Edited',
    price: 888,
    maxTemp: 88,
    numberOfPeople: 8,
    street: 'Editstreet. 12',
    zip: 8411,
    location: 'Hinterthur',
    type: 'Dachsauna',
}

const checkInputs = ['name', 'description', 'price', 'maxTemp', 'numberOfPeople', 'street', 'zip', 'location', 'type']

describe('<SaunaEditor>', () => {
    test('properties are assigned to inputs correctly', () => {
        render(<SaunaEditor value={testSauna} />)

        checkInputs.forEach(key => {
            const input = getInputField(`input-${key}`)
            expect(input).toBeInTheDocument()
            expect(input).toHaveValue((testSauna as any)[key])
        })

        expect(getCheckbox('input-mobile')).toBeChecked()
    })

    test('onChange is called correctly', () => {
        const onChange = jest.fn()
        render(<SaunaEditor value={testSauna} onChange={onChange} />)

        let calls = 0
        Object.entries(edited).forEach(([key, value]) => {
            fireEvent.change(getInputField(`input-${key}`), { target: { value: value } })
            expect(onChange).toBeCalledTimes(++calls)
            expect(onChange).toBeCalledWith({ ...testSauna, [key]: value })
        })

        fireEvent.click(getCheckbox('input-mobile'))
        expect(onChange).toBeCalledTimes(++calls)
        expect(onChange).toBeCalledWith({ ...testSauna, mobile: false })
    })

    test('onSubmit is called correctly', () => {
        const onSubmit = jest.fn()
        render(<SaunaEditor value={testSauna} onSubmit={onSubmit} />)
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(onSubmit).toBeCalledTimes(1)
    })
})

const getInputField = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('input')
}

const getCheckbox = (testId: string) => {
    const checkbox = screen.getByTestId(testId)
    return within(checkbox).getByTestId('checkbox')
}
