import { render, screen, within, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import UserEditor from './UserEditor'

describe('<UserEditor>', () => {
    test('show input correctly', () => {
        render(
            <BrowserRouter>
                <UserEditor value={exampleUser} isCreate={true} />
            </BrowserRouter>
        )

        inputs.forEach(input => {
            const label = getLabelOfInput(input.testId)
            expect(label).toHaveTextContent(input.label)

            const inputValue = getFieldOfInput(input.testId)
            expect(inputValue).toHaveAttribute('value', input.value)
        })
    })

    test('input changes correctly', () => {
        const onChange = jest.fn()
        render(
            <BrowserRouter>
                <UserEditor value={exampleUser} onChange={onChange} isCreate={true} />
            </BrowserRouter>
        )

        changeInputs.forEach(input => {
            const inputValue = getFieldOfInput(input.testId)
            fireEvent.change(inputValue, { target: { value: input.newValue } })

            expect(onChange).toBeCalledTimes(1)
            expect(onChange).toBeCalledWith({ ...exampleUser, [input.changedProperty]: input.newValue })

            jest.clearAllMocks()
        })
    })

    test('onClick event is called on click submit', () => {
        const onClick = jest.fn()
        render(
            <BrowserRouter>
                <UserEditor value={exampleUser} onSubmit={onClick} />
            </BrowserRouter>
        )

        const button = screen.getByTestId('submit-button')
        fireEvent.click(button)
        expect(onClick).toBeCalledTimes(1)
    })

    test('onDelete event is called on click and confirm', () => {
        global.confirm = () => true // stub window.confirm call
        const onDelete = jest.fn()

        render(
            <BrowserRouter>
                <UserEditor value={exampleUser} onDelete={onDelete} showDelete={true} />
            </BrowserRouter>
        )

        const deleteButton = screen.getByTestId('delete-button')
        fireEvent.click(deleteButton)
        expect(onDelete).toBeCalledTimes(1)
    })

    test('onDelete is not called if confirm is denied', () => {
        global.confirm = () => false // stub window.confirm call
        const onDelete = jest.fn()

        render(
            <BrowserRouter>
                <UserEditor value={exampleUser} onDelete={onDelete} showDelete={true} />
            </BrowserRouter>
        )

        const deleteButton = screen.getByTestId('delete-button')
        fireEvent.click(deleteButton)
        expect(onDelete).toBeCalledTimes(0)
    })

    test('Role is updated on change', () => {
        const onChange = jest.fn()
        render(
            <BrowserRouter>
                <UserEditor value={exampleUser} onChange={onChange} showRole={true} showDelete={true} />
            </BrowserRouter>
        )

        const selectComponent = screen.getByTestId('select-role')
        const select = within(selectComponent).getByTestId('select')

        expect(select).toHaveValue('USER')
        fireEvent.change(select, { target: { value: 'ADMIN' } })
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, role: 'ADMIN' })
    })

    const exampleUser: User.Request = {
        password: 'Password123',
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
    ]

    const getLabelOfInput = (testId: string) => {
        const input = screen.getByTestId(testId)
        return within(input).getByTestId('label')
    }

    const getFieldOfInput = (testId: string) => {
        const input = screen.getByTestId(testId)
        return within(input).getByTestId('input')
    }
})
