import { render, screen, within, fireEvent } from '@testing-library/react'
import RegisterForm from './RegisterForm'
import { User } from '../entities/User'
import { BrowserRouter } from 'react-router-dom'

const exampleUser: User.Edit = {
    username: 'MaxMeier',
    password: 'Password123',
    repeatPassword: 'Password123',
    name: 'Meier',
    firstname: 'Max',
    email: 'example@mail.com',
    telephone: '+41 44 444 44 44',
    place: 'ExamplePlace',
    street: 'Examplestreet',
    zip: '2222',
}

describe('<RegisterForm>', () => {
    test('render correctly', () => {
        render(<RegisterForm user={exampleUser} />)

        const label = getLabelOfInput('name-input')
        expect(label).toHaveTextContent('Name')

        const input = getFieldOfInput('name-input')
        expect(input).toHaveValue(exampleUser.name)
    })
    test('calls onChange correctly', () => {
        const onChange = jest.fn()
        render(<RegisterForm user={exampleUser} onChange={onChange} />)

        const nameInput = getFieldOfInput('name-input')
        fireEvent.change(nameInput, { target: { value: 'new name' } })

        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith({ ...exampleUser, name: 'new name' })
    })
    /*
    test('input is displayed correctly', () => {
        render(<RegisterForm user={exampleUser} />)
        const user1name = screen.getByText(exampleUser.name)
        expect(user1name).toBeInTheDocument()
        //const user1firstname = screen.getByText(exampleUser.firstname)
        //expect(user1firstname).toHaveTextContent('Max')
    })*/
})

const getLabelOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('label')
}

const getFieldOfInput = (testId: string) => {
    const input = screen.getByTestId(testId)
    return within(input).getByTestId('input')
}
