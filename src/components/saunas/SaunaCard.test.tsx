import { render, screen } from '@testing-library/react'
import SaunaCard from './SaunaCard'
import { BrowserRouter } from 'react-router-dom'
import { Sauna } from '../../entities/Sauna'

const exampleSauna: Sauna.Response = {
    id: 1,
    name: 'saunaOne',
    description: 'Steam Sauna',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: false,
}

describe('<SaunCard>', () => {
    test('render correctly', () => {
        render(
            <BrowserRouter>
                <SaunaCard sauna={exampleSauna} />
            </BrowserRouter>
        )
    })

    test('testing property name', () => {
        render(
            <BrowserRouter>
                <SaunaCard sauna={exampleSauna} />
            </BrowserRouter>
        )
        const sauna1 = screen.getByText('saunaOne')
        expect(sauna1).toContainHTML('<h2 class="text-2xl font-extrabold text-gray-900">saunaOne</h2>')
        expect(sauna1).toHaveClass('text-2xl font-extrabold text-gray-900')
    })

    test('testing property description', () => {
        render(
            <BrowserRouter>
                <SaunaCard sauna={exampleSauna} />
            </BrowserRouter>
        )
        const sauna1 = screen.getByText('Steam Sauna')
        expect(sauna1).toContainHTML('<p class="text-gray-500>')
        expect(sauna1).toHaveClass('text-gray-500')
    })
})
