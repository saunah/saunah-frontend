import { render, screen, within, fireEvent } from '@testing-library/react'
import RegisterForm from './RegisterForm'
import { User } from '../entities/User'

const exampleUser: User.Request = {
    password: 'Password123',
    repeatPassword: 'Password123',
    name: 'Meier',
    firstname: 'Max',
    email: 'example@mail.com',
    telephone: '+41 44 444 44 44',
    place: 'ExamplePlace',
    street: 'Examplestreet 11',
    zip: '2222',
}
const inputs = [
    { testId: 'name-input', label: 'Name', value: exampleUser.name },
    { testId: 'firstname-input', label: 'Vorname', value: exampleUser.firstname },
    { testId: 'mail-input', label: 'Mail', value: exampleUser.email },
    { testId: 'telephone-input', label: 'Telefon', value: exampleUser.telephone },
    { testId: 'place-input', label: 'Ort', value: exampleUser.place },
    { testId: 'street-input', label: 'Strasse', value: exampleUser.street },
    { testId: 'zip-input', label: 'PLZ', value: exampleUser.zip },
    { testId: 'password-input', label: 'Passwort', value: exampleUser.password },
    { testId: 'repeatPassword-input', label: 'Passwort', value: exampleUser.repeatPassword },
]

const changeInputs = [
    { testId: 'name-input', newValue: 'new name', changedProperty: 'name' },
    { testId: 'firstname-input', newValue: 'new firstname', changedProperty: 'firstname' },
    { testId: 'mail-input', newValue: 'mail@mail.com', changedProperty: 'email' },
    { testId: 'telephone-input', newValue: '+41 44 111 11 11', changedProperty: 'telephone' },
    { testId: 'place-input', newValue: 'new placename', changedProperty: 'place' },
    { testId: 'street-input', newValue: 'new street', changedProperty: 'street' },
    { testId: 'zip-input', newValue: '1111', changedProperty: 'zip' },
    { testId: 'password-input', newValue: 'newPassword789?', changedProperty: 'password' },
    { testId: 'repeatPassword-input', newValue: 'newPassword789?', changedProperty: 'repeatPassword' },
]

describe('<RegisterForm>', () => {
    test('show input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        inputs.forEach(input => {
            const label = getLabelOfInput(input.testId)
            expect(label).toHaveTextContent(input.label)

            const inputValue = getFieldOfInput(input.testId)
            expect(inputValue).toHaveValue(input.value)
        })
    })
    test('input changes correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

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
        render(<RegisterForm user={exampleUser} onSubmit={onClick} />)

        const button = getButtonClick('register-button')
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

const getButtonClick = (testId: string) => {
    return screen.getByTestId(testId)
}
