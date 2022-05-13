import { render, screen } from '@testing-library/react'
import { mockUserAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter } from 'react-router-dom'
import UsersListView from './UsersListView'
import { UserMock } from '../../../networking/api/user.mock'

describe('<UserListView>', () => {
    const defaultTestId = 'users-list-view'

    test('Table is displayed', async () => {
        mockUserAPI(UserMock.simpleMock())
        render(<UsersListView />, { wrapper: wrapper })
        expect(await screen.findByTestId(defaultTestId)).toBeInTheDocument()
    })

    test('Users are displayed correctly in the table', async () => {
        mockUserAPI(UserMock.simpleMock())
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

    const wrapper = (props: { children?: ReactNode }) => {
        return (
            <MemoryRouter>
                <AlertProvider>{props.children}</AlertProvider>
            </MemoryRouter>
        )
    }

    const tableValues = [
        [
            `${UserMock.sampleResponse1.firstName} ${UserMock.sampleResponse1.lastName}`,
            UserMock.sampleResponse1.email,
            UserMock.sampleResponse1.telephone,
            UserMock.sampleResponse1.role,
            '',
        ],
        [
            `${UserMock.sampleResponse2.firstName} ${UserMock.sampleResponse2.lastName}`,
            UserMock.sampleResponse2.email,
            UserMock.sampleResponse2.telephone,
            UserMock.sampleResponse2.role,
            '',
        ],
    ]
})
