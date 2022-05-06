import { render, screen } from '@testing-library/react'
import SaunaCard from './SaunaCard'
import { BrowserRouter } from 'react-router-dom'
import { Sauna } from '../../entities/Sauna'
import { SaunaImage } from '../../entities/SaunaImage'
import { mockSaunaImageAPI } from '../../networking/api'

const exampleSauna: Sauna.Response = {
    id: 1,
    name: 'saunaOne',
    description: 'Steam Sauna',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const imagesMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([saunaImage1])),
        add: jest.fn(() => Promise.resolve()),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const saunaImage1: SaunaImage.Response = {
    id: 1,
    saunaId: 1,
    fileName: 'test-sauna-1',
}

describe('<SaunaCard>', () => {
    test('testing property name', async () => {
        mockSaunaImageAPI(imagesMock())
        render(
            <BrowserRouter>
                <SaunaCard sauna={exampleSauna} />
            </BrowserRouter>
        )
        expect(await screen.findByText('saunaOne')).toBeInTheDocument()
    })
})
