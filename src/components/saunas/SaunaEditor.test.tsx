import { fireEvent, render, screen, within } from '@testing-library/react'
import { Sauna } from '../../entities/Sauna'
import { SaunaMock } from '../../networking/api/sauna.mock'
import SaunaEditor from './SaunaEditor'

describe('<SaunaEditor>', () => {
    test('properties are assigned to inputs correctly', () => {
        render(<SaunaEditor value={SaunaMock.sampleRequest} />)

        Object.keys(SaunaMock.sampleRequest)
            .filter(k => ![...ignoredInputKeys, ...notInputKeys].includes(k))
            .forEach(key => {
                const input = getInputField(`input-${key}`)
                expect(input).toBeInTheDocument()
                expect(input).toHaveDisplayValue((SaunaMock.sampleRequest as any)[key])
            })

        expect(getCheckbox('input-mobile')).not.toBeChecked()
    })

    test('onChange is called correctly', () => {
        const onChange = jest.fn()
        render(<SaunaEditor value={SaunaMock.sampleRequest} onChange={onChange} />)

        let calls = 0
        Object.entries(editedSauna)
            .filter(([key, _]) => ![...ignoredInputKeys, ...notInputKeys].includes(key))
            .forEach(([key, value]) => {
                fireEvent.change(getInputField(`input-${key}`), { target: { value: value } })
                expect(onChange).toBeCalledTimes(++calls)
                expect(onChange).toBeCalledWith({ ...SaunaMock.sampleRequest, [key]: value })
            })

        fireEvent.click(getCheckbox('input-mobile'))
        expect(onChange).toBeCalledTimes(++calls)
        expect(onChange).toBeCalledWith({ ...SaunaMock.sampleRequest, mobile: true })
    })

    test('onSubmit is called correctly', () => {
        const onSubmit = jest.fn()
        render(<SaunaEditor value={SaunaMock.sampleRequest} onSubmit={onSubmit} />)
        fireEvent.click(screen.getByTestId('submit-button'))
        expect(onSubmit).toBeCalledTimes(1)
    })

    test('onDelete button is only shown if flag set', () => {
        render(<SaunaEditor value={SaunaMock.sampleRequest} showDelete={false} />)
        expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument()

        render(<SaunaEditor value={SaunaMock.sampleRequest} showDelete={true} />)
        expect(screen.getByTestId('delete-button')).toBeInTheDocument()
    })

    test('onDelete is called when alert is accepted', () => {
        const onDelete = jest.fn()
        render(<SaunaEditor value={SaunaMock.sampleRequest} showDelete={true} onDelete={onDelete} />)
        window.confirm = jest.fn(() => true)
        fireEvent.click(screen.getByTestId('delete-button'))
        expect(window.confirm).toBeCalled()
        expect(onDelete).toBeCalled()
    })

    test('onDelete is not called when alert is dismissed', () => {
        const onDelete = jest.fn()
        render(<SaunaEditor value={SaunaMock.sampleRequest} showDelete={true} onDelete={onDelete} />)
        window.confirm = jest.fn(() => false)
        fireEvent.click(screen.getByTestId('delete-button'))
        expect(window.confirm).toBeCalled()
        expect(onDelete).not.toBeCalled()
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

const editedSauna: Sauna.Request = {
    id: SaunaMock.sampleResponse1.id,
    mobile: SaunaMock.sampleRemoteResponse1.mobile,
    name: 'Test Edited',
    description: 'Hoi Edited',
    price: '888',
    maxTemp: '88',
    numberOfPeople: '8',
    street: 'Editstreet. 12',
    zip: '8411',
    location: 'Hinterthur',
    type: 'Dachsauna',
    googleCalendarId: 'new-id',
}

const ignoredInputKeys = ['id']
const notInputKeys = ['mobile']
