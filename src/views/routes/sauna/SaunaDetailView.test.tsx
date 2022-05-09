import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Sauna } from '../../../entities/Sauna'
import { mockSaunaAPI } from '../../../networking/api'
import SaunaDetailView from './SaunaDetailView'

jest.mock('../../../components/saunas/SaunaCalendar')

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

describe('<SaunaDetailView>', () => {
    test('is here', async () => {
        mockSaunaAPI(defaultMock())
        render(<SaunaDetailView />, { wrapper })
        expect(await screen.findByText('Details', { exact: false })).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <MemoryRouter initialEntries={['/saunas/1']}>
            <Routes>
                <Route path="/saunas/:saunaId" element={props.children} />
            </Routes>
        </MemoryRouter>
    )
}
