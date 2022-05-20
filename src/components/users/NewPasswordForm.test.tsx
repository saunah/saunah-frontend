import { render, screen, fireEvent, within } from '@testing-library/react'
import { UserMock } from '../../networking/api/user.mock'
import NewPasswordForm from './NewPasswordForm'

describe('<NewPasswordForm>', () => {
    test('values are set correctly', () => {
        render(<NewPasswordForm value={UserMock.sampleNewPasswordRequest} />)

        const input = getFieldOfInput('input-new-password')
        expect(input).toHaveValue(UserMock.sampleNewPasswordRequest.newPassword)
    })

    test('values change correctly', () => {
        const changedValue = 'different input'

        const onChange = jest.fn()
        render(<NewPasswordForm value={UserMock.sampleNewPasswordRequest} onChange={onChange} />)

        const input = getFieldOfInput('input-new-password')
        fireEvent.change(input, { target: { value: changedValue } })

        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...UserMock.sampleNewPasswordRequest, newPassword: changedValue })
    })

    const getFieldOfInput = (testId: string) => {
        const input = screen.getByTestId(testId)
        return within(input).getByTestId('input')
    }
})
