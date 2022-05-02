import { render, screen, within, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'
import { LoginCredentials } from '../entities/LoginCredentials'
import { BrowserRouter } from 'react-router-dom'

const testUser: LoginCredentials.Request = {
    username: 'Hans',
    password: '1234',
}

const getFieldOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('input')
}

function getLabelOfInput(testId: string) {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('label')
}

describe('<LoginForm test>', () => {
    test('show username correctly', () => {
        render(
            <BrowserRouter>
                <LoginForm user={testUser} />
            </BrowserRouter>
        )
        const label = getLabelOfInput('username-input')
        expect(label).toHaveTextContent('Benutzername')

        const input = getFieldOfInput('username-input')
        expect(input).toHaveValue(testUser.username)
    })

    test('show password correctly', () => {
        render(
            <BrowserRouter>
                <LoginForm user={testUser} />
            </BrowserRouter>
        )
        const label = getLabelOfInput('password-input')
        expect(label).toHaveTextContent('Passwort')

        const input = getFieldOfInput('password-input')
        expect(input).toHaveValue(testUser.password)
    })

    test('check username change', () => {
        const onChange = jest.fn()
        render(
            <BrowserRouter>
                <LoginForm user={testUser} onChange={onChange} />
            </BrowserRouter>
        )

        const input = getFieldOfInput('username-input')
        fireEvent.change(input, { target: { value: 'different text' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...testUser, username: 'different text' })
    })

    test('check password change', () => {
        const onChange = jest.fn()
        render(
            <BrowserRouter>
                <LoginForm user={testUser} onChange={onChange} />
            </BrowserRouter>
        )

        const input = getFieldOfInput('password-input')
        fireEvent.change(input, { target: { value: '1111' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...testUser, password: '1111' })
    })
})
