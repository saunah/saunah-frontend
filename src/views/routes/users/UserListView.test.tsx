import { render, screen } from '@testing-library/react'
import { User } from '../../../entities/User'
import { mockUserAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter } from 'react-router-dom'
import { UserRole } from '../../../entities/UserRole'
import UsersListView from './UsersListView'

describe('<UserListView>', () => {
    const defaultTestId = 'users-list-view'

    test('Table is displayed', async () => {
        mockUserAPI(defaultMock())
        render(<UsersListView />, { wrapper: wrapper })
        expect(await screen.findByTestId(defaultTestId)).toBeInTheDocument()
    })

    test('Users are displayed correctly in the table', async () => {
        mockUserAPI(defaultMock())
        render(<UsersListView />, { wrapper: wrapper })

        const tableComponent = await screen.findByTestId(defaultTestId)
        const table = tableComponent.querySelector('table')

        const bodyRows = table?.querySelectorAll('tbody tr')

        bodyRows?.forEach((row, rowIdx) => {
            row.childNodes.forEach((element, elementIdx) => {
                expect(element).toHaveTextContent(tableValues[rowIdx][elementIdx])
            })
        })
    })

    const defaultMock = () => {
        return {
            signup: jest.fn(() => Promise.resolve()),
            login: jest.fn(() => Promise.resolve({ token: 'abc' })),
            verify: jest.fn(() => Promise.resolve()),
            list: jest.fn(() => Promise.resolve([user1, user2])),
            get: jest.fn(() => Promise.resolve(user1)),
            edit: jest.fn(() => Promise.resolve(user1)),
            remove: jest.fn(() => Promise.resolve()),
            whoami: jest.fn(() => Promise.resolve(user1)),
        }
    }

    const wrapper = (props: { children?: ReactNode }) => {
        return (
            <MemoryRouter>
                <AlertProvider>{props.children}</AlertProvider>
            </MemoryRouter>
        )
    }

    const user1: User.Response = {
        id: 1,
        role: UserRole.Local.ADMIN,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telephone: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
    }

    const user2: User.Response = {
        id: 2,
        role: UserRole.Local.USER,
        firstName: 'Jonny',
        lastName: 'Doey',
        email: 'jonny@example.com',
        telephone: '078 987 65 43',
        street: 'Technikumstrasse 11',
        place: 'Zürich',
        zip: '8000',
    }

    const tableValues = [
        [`${user1.firstName} ${user1.lastName}`, user1.email, user1.telephone, user1.role, ''],
        [`${user2.firstName} ${user2.lastName}`, user2.email, user2.telephone, user2.role, ''],
    ]
})
