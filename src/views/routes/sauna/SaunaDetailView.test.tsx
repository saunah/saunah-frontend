import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Sauna } from '../../../entities/Sauna'
import { mockSaunaAPI } from '../../../networking/api'
import AlertProvider from '../../shared/AlertProvider'
import SaunaDetailView from './SaunaDetailView'

describe('<SaunaDetailView', () => {
    test('show data correctly', async () => {
        const mock = mockSaunaAPI(defaultMock())
        render(<SaunaDetailView />, { wrapper: wrapper('/sauna/1') })

        await waitForStateUpdate()
        expect(screen.getByTestId('sauna-detail')).toBeInTheDocument()

        expect(mock.get).toBeCalledTimes(1)
    })
})

const defaultMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([sauna1])),
        get: jest.fn(() => Promise.resolve(sauna1)),
        add: jest.fn(() => Promise.resolve(sauna1)),
        edit: jest.fn(() => Promise.resolve(sauna1)),
        remove: jest.fn(() => Promise.resolve()),
    }
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

// this line is needed, so we don't get state update warnings
const waitForStateUpdate = () => screen.findByTestId('sauna-detail')

const wrapper = (startRoute: string) => (props: { children?: ReactNode }) => {
    return (
        <AlertProvider>
            <MemoryRouter initialEntries={[startRoute]}>
                <Routes>
                    <Route path="/sauna/saunaId" element={props.children} />
                </Routes>
            </MemoryRouter>
        </AlertProvider>
    )
}
