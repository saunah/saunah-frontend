import { render, screen, within, fireEvent } from '@testing-library/react'
import SetNewPasswordForm from './SetNewPasswordForm'
import { SetNewPassword } from '../entities/SetNewPassword'

const testRequest: SetNewPassword.Request = {
    mailadress:'eins@test.com',
    newPassword:'sdfs',
    resetToken :'sdfszt'
}

const getFieldOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('input')
}

function getLabelOfInput(testId: string) {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('label')
}

describe('<Reset Password Test>', () =>{

    //Check labels 
    test('check labels enter mail-field', () => {
        render(<SetNewPasswordForm request={testRequest}/>)
        const label = getLabelOfInput('mailadress-id')
        expect(label).toHaveTextContent('Email')

        const input = getFieldOfInput('mailadress-id')
        expect(input).toHaveValue(testRequest.mailadress)
        
    })

    test('check labels enter password field', () => {
        render(<SetNewPasswordForm request={testRequest}/>)
        const label = getLabelOfInput('set-new-pw-field')
        expect(label).toHaveTextContent('Neues Passwort eingeben')

        const input = getFieldOfInput('set-new-pw-field')
        expect(input).toHaveValue(testRequest.newPassword)
        
    })
    
    // Check field change
    test('check mail-field change', () => {
        const onChange = jest.fn()
        render(<SetNewPasswordForm request={testRequest} onChange={onChange}/>)

        const input = getFieldOfInput('mailadress-id')
        fireEvent.change(input, { target: { value: 'different input' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...testRequest, mailadress: 'different input' })
    })

    test('check password-field change', () => {
        const onChange = jest.fn()
        render(<SetNewPasswordForm request={testRequest} onChange={onChange}/>)

        const input = getFieldOfInput('set-new-pw-field')
        fireEvent.change(input, { target: { value: 'different input' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...testRequest, newPassword: 'different input' })
    })
})