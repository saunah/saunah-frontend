import { render, screen, fireEvent } from '@testing-library/react'
import { User } from '../../../entities/User'
import { mockUserAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { UserRole } from '../../../entities/UserRole'
import UserEditorView from './UserEditorView'

describe('<UserEditorView>', () => {
    const defaultTestId = 'user-editor'

    test('Editor is displayed', async () => {
        mockUserAPI(defaultMock())
        render(<UserEditorView />, { wrapper: wrapper })
        expect(await screen.findByTestId(defaultTestId)).toBeInTheDocument()
    })

    test('Sends data on submit', async () => {
        const mock = mockUserAPI(defaultMock())

        render(<UserEditorView />, { wrapper: wrapper })

        const button = screen.getByTestId('submit-button')
        expect(button).toHaveTextContent('Speichern')

        await screen.findByTestId('user-editor')

        fireEvent.click(button)
        expect(mock.edit).toBeCalledTimes(1)
        expect(mock.edit).toBeCalledWith(userId, User.mapToRequest(testUser))

        // test redirect happens
        const usersView = await screen.findByTestId('users-view')
        expect(usersView).toBeInTheDocument()
    })

    test('Deleting user works', async () => {
        global.confirm = () => true // stub window.confirm call
        const mock = mockUserAPI(defaultMock())

        render(<UserEditorView />, { wrapper: wrapper })

        const deleteButton = screen.getByTestId('delete-button')
        expect(deleteButton).toHaveTextContent('Löschen')

        await screen.findByTestId('user-editor')

        fireEvent.click(deleteButton)
        expect(mock.remove).toBeCalledTimes(1)
        expect(mock.remove).toBeCalledWith(userId)

        // test redirect happens
        const usersView = await screen.findByTestId('users-view')
        expect(usersView).toBeInTheDocument()
    })

    const defaultMock = () => {
        return {
            signup: jest.fn(() => Promise.resolve()),
            login: jest.fn(() => Promise.resolve({ token: 'abc' })),
            verify: jest.fn(() => Promise.resolve()),
            list: jest.fn(() => Promise.resolve([])),
            get: jest.fn(() => Promise.resolve(testUser)),
            edit: jest.fn(() => Promise.resolve(testUser)),
            remove: jest.fn(() => Promise.resolve()),
            whoami: jest.fn(() => Promise.resolve(testUser)),
        }
    }

    const userId = 1

    const testUser: User.Response = {
        id: userId,
        role: UserRole.Local.USER,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telephone: '078 123 45 67',
        street: 'Technikumstrasse 9',
        place: 'Winterthur',
        zip: '8400',
    }

    const wrapper = (props: { children?: ReactNode }) => {
        return (
            <MemoryRouter initialEntries={[`/users/${userId}`]}>
                <AlertProvider>
                    <Routes>
                        <Route path="/users" element={<div data-testid="users-view"></div>} />
                        <Route path="/users/:userId" element={props.children} />
                    </Routes>
                </AlertProvider>
            </MemoryRouter>
        )
    }
})
