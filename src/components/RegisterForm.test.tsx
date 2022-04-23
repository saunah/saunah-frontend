import { render, screen, fireEvent } from '@testing-library/react'
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
        render(
            <BrowserRouter>
                <RegisterForm user={exampleUser} />
            </BrowserRouter>
        )
        const user1 = screen.getByText(exampleUser.name)
        expect(user1).toBeInTheDocument()
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
