import { render, screen, within, fireEvent } from '@testing-library/react'
import RegisterForm from './RegisterForm'
import { User } from '../entities/User'

const exampleUser: User.Edit = {
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

describe('<RegisterForm>', () => {
    test('show input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('name-input')
        expect(label).toHaveTextContent('Name')

        const input = getFieldOfInput('name-input')
        expect(input).toHaveValue(exampleUser.name)
    })
    test('show firstname input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('firstname-input')
        expect(label).toHaveTextContent('Vorname')

        const input = getFieldOfInput('firstname-input')
        expect(input).toHaveValue(exampleUser.firstname)
    })
    test('show email input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('mail-input')
        expect(label).toHaveTextContent('Mail')

        const input = getFieldOfInput('mail-input')
        expect(input).toHaveValue(exampleUser.email)
    })
    test('show telephone input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('telephone-input')
        expect(label).toHaveTextContent('Telefon')

        const input = getFieldOfInput('telephone-input')
        expect(input).toHaveValue(exampleUser.telephone)
    })
    test('show place input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('place-input')
        expect(label).toHaveTextContent('Ort')

        const input = getFieldOfInput('place-input')
        expect(input).toHaveValue(exampleUser.place)
    })
    test('show street input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('street-input')
        expect(label).toHaveTextContent('Strasse')

        const input = getFieldOfInput('street-input')
        expect(input).toHaveValue(exampleUser.street)
    })
    test('show zip input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('zip-input')
        expect(label).toHaveTextContent('PLZ')

        const input = getFieldOfInput('zip-input')
        expect(input).toHaveValue(exampleUser.zip)
    })
    test('show password input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('password-input')
        expect(label).toHaveTextContent('Passwort')

        const input = getFieldOfInput('password-input')
        expect(input).toHaveValue(exampleUser.password)
    })
    test('show repeat-password input correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('repeatPassword-input')
        expect(label).toHaveTextContent('Passwort')

        const input = getFieldOfInput('repeatPassword-input')
        expect(input).toHaveValue(exampleUser.repeatPassword)
    })

    test('calls name onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const nameInput = getFieldOfInput('name-input')
        fireEvent.change(nameInput, { target: { value: 'new name' } })

        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, name: 'new name' })
    })
    test('calls firstname onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const firstNameInput = getFieldOfInput('firstname-input')
        fireEvent.change(firstNameInput, { target: { value: 'new firstname' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, firstname: 'new firstname' })
    })
    test('calls email onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const mailInput = getFieldOfInput('mail-input')
        fireEvent.change(mailInput, { target: { value: 'mail@mail.com' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, email: 'mail@mail.com' })
    })
    test('calls telephone onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const telephoneInput = getFieldOfInput('telephone-input')
        fireEvent.change(telephoneInput, { target: { value: '+41 44 111 11 11' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, telephone: '+41 44 111 11 11' })
    })
    test('calls place onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const placeInput = getFieldOfInput('place-input')
        fireEvent.change(placeInput, { target: { value: 'new placename' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, place: 'new placename' })
    })
    test('calls street onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const streetInput = getFieldOfInput('street-input')
        fireEvent.change(streetInput, { target: { value: 'new street' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, street: 'new street' })
    })
    test('calls zip onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const zipInput = getFieldOfInput('zip-input')
        fireEvent.change(zipInput, { target: { value: '1111' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, zip: '1111' })
    })
    test('calls password onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const passwordInput = getFieldOfInput('password-input')
        fireEvent.change(passwordInput, { target: { value: 'newPassword789?' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, password: 'newPassword789?' })
    })
    test('calls repeatPassword onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const repeatPasswordInput = getFieldOfInput('repeatPassword-input')
        fireEvent.change(repeatPasswordInput, { target: { value: 'newPassword789?' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, repeatPassword: 'newPassword789?' })
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
