import { render, screen, fireEvent, within } from '@testing-library/react'
import { UserMock } from '../../networking/api/user.mock'
import ResetPasswordForm from './ResetPasswordForm'

describe('<ResetPasswordForm>', () => {
    test('values are set correclty', () => {
        render(<ResetPasswordForm value={UserMock.sampleResetRequest} />)

        const input = getFieldOfInput('input-email')
        expect(input).toHaveValue(UserMock.sampleResetRequest.email)
    })

    test('values change correctly', () => {
        const changedValue = 'different input'

        const onChange = jest.fn()
        render(<ResetPasswordForm value={UserMock.sampleResetRequest} onChange={onChange} />)

        const input = getFieldOfInput('input-email')
        fireEvent.change(input, { target: { value: changedValue } })

        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...UserMock.sampleResetRequest, email: changedValue })
    })

    const getFieldOfInput = (testId: string) => {
        const input = screen.getByTestId(testId)
        return within(input).getByTestId('input')
    }
})
