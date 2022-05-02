import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { Sauna } from '../../entities/Sauna'
import { mockSaunaAPI } from '../../networking/api'
import Overview from './Overview'

const defaultMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([sauna1])),
        get: jest.fn(() => Promise.resolve(sauna1)),
        add: jest.fn(() => Promise.resolve(sauna1)),
        edit: jest.fn(() => Promise.resolve(sauna1)),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const wrapper = (startRoute: string) => (props: { children?: ReactNode }) => {
    return(
        <MemoryRouter initialEntries={[startRoute]}>
            <Routes>
                <Route path="/sauna/:saunaId/list" element={props.children} />
            </Routes>
        </MemoryRouter>    
    )
}

const sauna1: Sauna.Response = {
    id: 1,
    name: 'Sauna 1',
    description: 'Das ist Sauna 1.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const waitForStateUpdate = () => screen.findByTestId('overviewTID')

describe('<Overview Tests>', () => {
    test('the correct sauna is fetched on the edit page', async () => {
        const mock = mockSaunaAPI(defaultMock())

        render(<Overview />, { wrapper: wrapper('/saunas/') })
        await waitForStateUpdate()
        expect(screen.getByTestId('overviewTID')).toBeInTheDocument()

        expect(mock.list).toBeCalledTimes(1)
    })
})
