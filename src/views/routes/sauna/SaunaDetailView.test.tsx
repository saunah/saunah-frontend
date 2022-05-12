import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Sauna } from '../../../entities/Sauna'
import { mockSaunaAPI, mockUserAPI } from '../../../networking/api'
import { simpleUserMock } from '../../../networking/api/userMock'
import AuthProvider from '../../shared/AuthProvider'
import SaunaDetailView from './SaunaDetailView'

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
    beforeEach(() => {
        mockUserAPI(simpleUserMock())
    })

    test('shows SaunaDetail correctly', async () => {
        mockSaunaAPI(defaultMock())
        render(<SaunaDetailView />, { wrapper: wrapper })
        expect(await screen.findByTestId('sauna-detail-view')).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <AuthProvider>
            <MemoryRouter initialEntries={['/saunas/1']}>
                <Routes>
                    <Route path="/saunas/:saunaId" element={props.children} />
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    )
}
