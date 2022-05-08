import { render, screen, within, fireEvent } from '@testing-library/react'
import ResetPasswordMailForm from './ResetPasswordMailForm'
import { PwResetMailRequest } from '../entities/PwResetMailRequest'

const testRequest: PwResetMailRequest.Request = {
    mailadress:'eins@test.com'
}

const getFieldOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('input')
}

function getLabelOfInput(testId: string) {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('label')
}

describe('<PwResetMailRequest Test>', () =>{
    test('check labels inputfield', () => {
        render(<ResetPasswordMailForm request={testRequest}/>)
        const label = getLabelOfInput('mailaddress-input')
        expect(label).toHaveTextContent('Mailadresse')

        const input = getFieldOfInput('mailaddress-input')
        expect(input).toHaveValue(testRequest.mailadress)
        
    })

    test('check inputfield change', () => {
        const onChange = jest.fn()
        render(<ResetPasswordMailForm request={testRequest} onChange={onChange}/>)

        const input = getFieldOfInput('mailaddress-input')
        fireEvent.change(input, { target: { value: 'different input' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...testRequest, mailadress: 'different input' })
    })
})