import { render, screen, within, fireEvent } from '@testing-library/react'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import UserEditor from './UserEditor'

const exampleUser: User.Request = {
    password: 'Password123',
    repeatPassword: 'Password123',
    lastName: 'Meier',
    firstName: 'Max',
    email: 'example@mail.com',
    telephone: '+41 44 444 44 44',
    place: 'ExamplePlace',
    street: 'Examplestreet 11',
    zip: '2222',
    role: UserRole.Local.USER,
}
const inputs = [
    { testId: 'input-first-name', label: 'Vorname', value: exampleUser.firstName },
    { testId: 'input-last-name', label: 'Nachname', value: exampleUser.lastName },
    { testId: 'input-email', label: 'Email', value: exampleUser.email },
    { testId: 'input-telephone', label: 'Telefonnummer', value: exampleUser.telephone },
    { testId: 'input-street', label: 'Strasse', value: exampleUser.street },
    { testId: 'input-zip', label: 'PLZ', value: exampleUser.zip },
    { testId: 'input-place', label: 'Ort', value: exampleUser.place },
    { testId: 'input-password', label: 'Passwort', value: exampleUser.password },
    { testId: 'input-repeat-password', label: 'Passwort', value: exampleUser.repeatPassword },
]

const changeInputs = [
    { testId: 'input-first-name', newValue: 'new firstname', changedProperty: 'firstName' },
    { testId: 'input-last-name', newValue: 'new name', changedProperty: 'lastName' },
    { testId: 'input-email', newValue: 'mail@mail.com', changedProperty: 'email' },
    { testId: 'input-telephone', newValue: '+41 44 111 11 11', changedProperty: 'telephone' },
    { testId: 'input-street', newValue: 'new street', changedProperty: 'street' },
    { testId: 'input-zip', newValue: '1111', changedProperty: 'zip' },
    { testId: 'input-place', newValue: 'new placename', changedProperty: 'place' },
    { testId: 'input-password', newValue: 'newPassword789?', changedProperty: 'password' },
    { testId: 'input-repeat-password', newValue: 'newPassword789?', changedProperty: 'repeatPassword' },
]

describe('<UserEditor>', () => {
    test('show input correctly', () => {
        render(<UserEditor value={exampleUser} isCreate={true} />)

        inputs.forEach(input => {
            const label = getLabelOfInput(input.testId)
            expect(label).toHaveTextContent(input.label)

            const inputValue = getFieldOfInput(input.testId)
            expect(inputValue).toHaveAttribute('value', input.value)
        })
    })
    test('input changes correctly', () => {
        const onChange = jest.fn()
        render(<UserEditor value={exampleUser} onChange={onChange} isCreate={true} />)

        changeInputs.forEach(input => {
            const inputValue = getFieldOfInput(input.testId)
            fireEvent.change(inputValue, { target: { value: input.newValue } })

            expect(onChange).toBeCalledTimes(1)
            expect(onChange).toBeCalledWith({ ...exampleUser, [input.changedProperty]: input.newValue })

            jest.clearAllMocks()
        })
    })
    test('register button, onClick event is called', () => {
        const onClick = jest.fn()
        render(<UserEditor value={exampleUser} onSubmit={onClick} />)

        const button = screen.getByTestId('submit-button')
        fireEvent.click(button)
        expect(onClick).toBeCalledTimes(1)
    })
})

const getLabelOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('label')
}

const getFieldOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('input')
}